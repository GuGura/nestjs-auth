import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private usersRepository: UsersRepository,
  ) {}

  async createLocalAccount(data: {
    email: string;
    password: string;
    name: string;
  }) {
    data.password = await this.authService.cryptoPassword(data?.password);
    await this.usersRepository.create(data);
    return true;
  }
}
