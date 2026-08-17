import { Injectable } from '@nestjs/common';
import { MembershipRole } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MembershipService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMembership(
    userId: string,
    organizationId: string,
    role: MembershipRole,
  ) {
    const membership = await this.prismaService.membership.create({
      data: {
        organizationId,
        userId,
        role,
      },
    });

    return membership;
  }

  async getMembershipById(userId: string, organizationId: string) {
    return this.prismaService.membership.findFirstOrThrow({
      where: {
        userId,
        organizationId,
      },
    });
  }
}
