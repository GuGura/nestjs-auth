import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Provider } from '@prisma/client';
import { Strategy, Profile } from 'passport-google-oauth20';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    console.log('google strategy');
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb,
  ) {
    const user = await this.usersService.validateOAuthUser(
      Provider.GOOGLE,
      accessToken,
      refreshToken,
      profile,
    );
    console.log(cb);
    console.log(profile);
    console.log(Provider.GOOGLE);

    return user;
  }
}

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
