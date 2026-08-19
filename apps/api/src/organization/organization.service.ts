import { Injectable } from '@nestjs/common';
import { MembershipService } from 'src/membership/membership.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly membershipService: MembershipService,
    private readonly projectService: ProjectService,
  ) {}

  async createOrganization(name: string, slug: string) {
    const organization = await this.prismaService.organization.create({
      data: {
        name,
        slug,
      },
    });
    return organization;
  }

  async getOrganizationById(id: string, userId: string) {
    await this.membershipService.getMembershipById(userId, id);

    const organization =
      await this.prismaService.organization.findUniqueOrThrow({
        where: {
          id,
        },
      });

    return organization;
  }

  async getAllProjectsOfOrganization(organizationId: string, userId: string) {
    await this.membershipService.getMembershipById(userId, organizationId);
    return this.projectService.getAllProjects(organizationId);
  }
}
