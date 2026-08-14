import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrganization(name: string, slug: string) {
    const organization = await this.prismaService.organization.create({
      data: {
        name,
        slug,
      },
    });
    return organization;
  }
}
