import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createLocalAccount(data: {
    email: string;
    password: string;
    name: string;
  }) {
    const account = await this.prisma.accounts.create({
      data: {
        password: await this.authService.cryptoPassword(data?.password),
        user: {
          create: {
            email: data.email,
            name: data.name,
          },
        },
      },
    });
    console.dir(account);
    return true;
  }
}
