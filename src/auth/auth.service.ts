import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersRepository))
    private usersRepository: UsersRepository,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async validateLocalUser(email: string, pass: string): Promise<any> {
    const account = await this.authRepository.findLocalAccountByEmail(email);

    const compare = await this.comparePassword(pass, account.password);
    if (compare === true) {
      return account.user;
    }
    return null;
  }

  async login(user: any, agent: string) {
    const token = await this.generateToken(user, agent);

    return {
      user,
      access: token.access,
      refresh: token.refresh,
    };
  }

  async generateToken(user: any, agent: string) {
    const access = this.jwtService.sign(user);
    const refresh = Math.random().toString(36).slice(2, 13);
    await this.authRepository.tokenCreateOrUpdated(
      user.id,
      agent,
      access,
      refresh,
    );
    return {
      access,
      refresh,
    };
  }

  setTokenToHttpOnlyCookie(res, result) {
    res.cookie('access', result.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', //HTTPS 사용여부
      sameSite: 'strict',
      path: '/',
    });
    res.cookie('refresh', result.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth/refresh',
    });
  }

  logoutHttpOnlyCookie(res) {
    res.cookie('access', '', {
      httpOnly: true,
      expires: new Date(Date.now() - 1000),
      secure: process.env.NODE_ENV === 'production', //HTTPS 사용여부
      sameSite: 'strict',
    });
    res.cookie('refresh', '', {
      httpOnly: true,
      expires: new Date(Date.now() - 1000),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  async cryptoPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
