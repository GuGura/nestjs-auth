import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async tokenCreateOrUpdated(
    userId: string,
    agent: string,
    access: string,
    refresh: string,
  ) {
    await this.prisma.userAccessTokens.upsert({
      where: {
        userId_platform: {
          userId: userId,
          platform: agent,
        },
      },
      update: {
        userId,
        access,
        refresh,
        updateAt: new Date(),
      },
      create: {
        userId,
        platform: agent,
        access,
        refresh,
      },
    });
  }
}
