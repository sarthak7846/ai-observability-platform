import { Injectable } from '@nestjs/common';
import { MembershipService } from 'src/membership/membership.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly membershipService: MembershipService,
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
    const membership = await this.membershipService.getMembershipById(
      userId,
      id,
    );

    const organization =
      await this.prismaService.organization.findUniqueOrThrow({
        where: {
          id,
        },
      });

    return organization;
  }
}
