import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthRepository } from './auth.repository';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { NaverStrategy } from './strategy/naver.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    LocalStrategy,
    GoogleStrategy,
    NaverStrategy,
    JwtStrategy,
  ],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
