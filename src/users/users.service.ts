import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from './users.repository';
import { AuthRepository } from '../auth/auth.repository';
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

  async findOrCreateOAuthAccount(
    provider: Provider,
    id: any,
    name: string,
    email: string,
  ) {
    const account = await this.usersRepository.findAccountByProvider(
      provider,
      id,
    );
    console.log('account::', account);
    if (account) {
      return account.user;
    } else {
      const newAccount = await this.usersRepository.createOAuthAccount(
        provider,
        id,
        name,
        email,
      );
      console.log('newAccount::', newAccount);
      return {
        id: newAccount.id,
        email,
        name,
      };
    }
  }
}
