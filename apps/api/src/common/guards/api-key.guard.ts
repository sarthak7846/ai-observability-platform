/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class APIKeyGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const apiKey = this.extractTokenFromHeader(request);

    if (!apiKey) return false;

    const keyHash = createHash('sha256').update(apiKey).digest('hex');

    const apiKeyEntry = await this.prismaService.aPIKey.findFirst({
      where: {
        keyHash,
      },
    });

    if (!apiKeyEntry || apiKeyEntry.revokedAt) return false;

    (request as { apiKey: { id: string; projectId: string } }).apiKey = {
      id: apiKeyEntry.id,
      projectId: apiKeyEntry.projectId,
    };
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
