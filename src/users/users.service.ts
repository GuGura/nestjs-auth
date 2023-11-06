import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  async createLocalAccount(data: {
    email: string;
    password: string;
    name: string;
  }) {
    console.log('data::', data.email, data.password, data.name);

    const account = await this.prisma.accounts.create({
      data: {
        password: await this.authService.cryptoPassword(data?.password),
        user: {
          create: {
            email: data?.email,
            name: data?.name,
          },
        },
      },
    });
    console.dir(account);
    return true;
  }
}
