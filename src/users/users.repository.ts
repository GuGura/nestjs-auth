import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthType, Provider } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createLocalAccount(data: {
    email: string;
    password: string;
    name: string;
  }) {
    const account = await this.prisma.accounts.create({
      data: {
        password: data?.password,
        user: {
          create: {
            email: data?.email,
            name: data?.name,
          },
        },
      },
    });
    console.dir(account);
  }

  async createOAuthAccount(
    provider: Provider,
    providerId: any,
    name: string,
    email: string,
  ) {
    const newAccount = await this.prisma.accounts.create({
      data: {
        type: AuthType.OAUTH,
        provider,
        providerAccountId: providerId,
        user: {
          create: {
            email,
            name,
          },
        },
      },
    });
    return {
      id: newAccount.id,
      email,
      name,
    };
  }

  async findLocalAccountByEmail(email: string) {
    const account = await this.prisma.accounts.findFirst({
      select: {
        password: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      where: {
        user: {
          email: email,
        },
      },
    });
    if (!!account === true) {
      return account;
    }
    return null;
  }

  async findAccountByProvider(provider: Provider, providerId: string) {
    const account = await this.prisma.accounts.findFirst({
      select: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      where: {
        provider: provider,
        providerAccountId: providerId,
      },
    });
    if (!!account === true) {
      return account;
    }
    return null;
  }
  async findAccountByTokens(access: string, refresh: string) {
    const account = await this.prisma.userAccessTokens.findFirst({
      select: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      where: {
        refresh: refresh,
        access: access,
      },
    });
    if (!!account === true) {
      return account;
    }
    return null;
  }
}
