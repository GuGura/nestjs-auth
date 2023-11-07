import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Provider } from '@prisma/client';
import { Strategy, Profile } from 'passport-google-oauth20';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['email', 'profile'],
    });
  }

  async validate(profile: Profile) {
    const { id, name, emails } = profile;
    return await this.usersService.findOrCreateOAuthAccount(
      Provider.GOOGLE,
      id,
      name.givenName,
      emails[0].value,
    );
  }
}

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
