import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto, CreateTraceDto } from './project.dto';
import { OrganizationService } from 'src/organization/organization.service';
import { MembershipService } from 'src/membership/membership.service';
import { createHash, randomBytes } from 'crypto';
import { APIKeyPayload } from './types/api-key.interface';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => OrganizationService))
    private readonly organizationService: OrganizationService,
    private readonly membershipService: MembershipService,
  ) {}

  async createProject(dto: CreateProjectDto, userId: string) {
    await this.organizationService.getOrganizationById(
      dto.organizationId,
      userId,
    );

    return this.prismaService.project.create({
      data: {
        organizationId: dto.organizationId,
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async getAllProjects(organizationId?: string) {
    const projects = await this.prismaService.project.findMany({
      where: {
        organizationId,
      },
    });

    return projects;
  }

  async createAPIKey(projectId: string, userId: string, name: string) {
    const project = await this.prismaService.project.findUniqueOrThrow({
      where: {
        id: projectId,
      },
    });

    await this.membershipService.getMembershipById(
      userId,
      project.organizationId,
    );

    // Create a unique key with hash
    const randomPart = randomBytes(32).toString('hex');
    const rawKey = `obs_live_${randomPart}`;
    const keyHash = createHash('sha256').update(rawKey).digest('hex');

    const { id } = await this.prismaService.aPIKey.create({
      data: {
        projectId,
        name,
        keyHash,
      },
    });

    return {
      id,
      key: rawKey,
      name,
    };
  }

  async getAllAPIKeys(projectId: string, userId: string) {
    const project = await this.prismaService.project.findUniqueOrThrow({
      where: {
        id: projectId,
      },
    });

    await this.membershipService.getMembershipById(
      userId,
      project.organizationId,
    );

    const apiKeys = await this.prismaService.aPIKey.findMany({
      where: {
        projectId,
      },
    });

    return apiKeys;
  }

  async verifyAPIKey(apiKey: string) {
    const keyHash = createHash('sha256').update(apiKey).digest('hex');

    const apiKeyEntry = await this.prismaService.aPIKey.findFirst({
      where: {
        keyHash,
      },
    });

    if (!apiKeyEntry || apiKeyEntry.revokedAt) return false;

    return {
      id: apiKeyEntry.id,
      projectId: apiKeyEntry.projectId,
    };
  }

  async createTrace(
    createTraceDto: CreateTraceDto,
    apiKeyPayload: APIKeyPayload,
  ) {
    const { projectId, id } = apiKeyPayload;
    const trace = await this.prismaService.trace.create({
      data: {
        ...createTraceDto,
        projectId,
        apiKeyId: id,
        input: JSON.stringify(createTraceDto.input),
        output: JSON.stringify(createTraceDto.output),
        metadata: JSON.stringify(createTraceDto.metadata),
      },
    });

    return trace;
  }
}
