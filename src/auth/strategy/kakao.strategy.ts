import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Provider } from '@prisma/client';
import { UsersService } from '../../users/users.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL: process.env.KAKAO_CALLBACK,
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    console.log(profile);
    console.log('accessToken::', accessToken);
    console.log('refreshToken::', refreshToken);
    console.log('done::', done);
    const { id, username } = profile;
    const res = await this.usersService.findOrCreateOAuthAccount(
      Provider.KAKAO,
      String(id),
      username,
      id + '@kakao.com',
    );
    console.log('res::', res);
    return res;
  }
}

@Injectable()
export class KaKaoAuthGuard extends AuthGuard('kakao') {}
