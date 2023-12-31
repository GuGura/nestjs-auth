import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Provider } from '@prisma/client';
import { UsersService } from '../../users/users.service';
import { Request } from 'express';

@Injectable()
// export class KakaoStrategy extends PassportStrategy(Strategy) {
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL: process.env.KAKAO_CALLBACK,
    });
  }
  authorizationParams(options?: any) {
    options['prompt'] = 'login';
    return options;
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, username } = profile;
    return await this.usersService.findOrCreateOAuthAccount(
      Provider.KAKAO,
      String(id),
      username,
      id + '@kakao.com',
    );
  }
}

@Injectable()
export class KaKaoAuthGuard extends AuthGuard('kakao') {}
