import { Strategy } from 'passport-local';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('1234');
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateLocalUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}