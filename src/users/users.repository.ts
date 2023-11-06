import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

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
}
