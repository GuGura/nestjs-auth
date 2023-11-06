import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from './users.repository';
import { AuthRepository } from '../auth/auth.repository';
import { Profile } from 'passport';
import { Provider } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @Inject(forwardRef(() => AuthRepository))
    private authRepository: AuthRepository,
    private usersRepository: UsersRepository,
  ) {}

  async createLocalAccount(data: {
    email: string;
    password: string;
    name: string;
  }) {
    data.password = await this.authService.cryptoPassword(data?.password);
    await this.usersRepository.createLocalAccount(data);
    return true;
  }

  async validateOAuthUser(
    provider: Provider,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {}
}
