import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

import { UsersService } from '../../users/users.service';
import { Provider } from '@prisma/client';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    console.log('123455');
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, emails } = profile;
    const name = emails[0].value.split('@')[0];
    return await this.usersService.findOrCreateOAuthAccount(
      Provider.NAVER,
      id,
      name,
      emails[0].value,
    );
  }
}

export class NaverAuthGuard extends AuthGuard('naver') {}
