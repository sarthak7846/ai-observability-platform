import { Injectable } from '@nestjs/common';
import { prisma, MembershipRole } from '@observe/db';

@Injectable()
export class MembershipService {
  async createMembership(
    userId: string,
    organizationId: string,
    role: MembershipRole,
  ) {
    const membership = await prisma.membership.create({
      data: {
        organizationId,
        userId,
        role,
      },
    });

    return membership;
  }

  async getMembershipById(userId: string, organizationId: string) {
    return prisma.membership.findFirstOrThrow({
      where: {
        userId,
        organizationId,
      },
    });
  }
}
