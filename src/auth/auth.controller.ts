import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategy/local.strategy';
import { Response } from 'express';
import { Public } from './strategy/public.decorator';
import { GoogleAuthGuard } from './strategy/google.strategy';
import { AuthGuard } from '@nestjs/passport';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    const result = await this.authService.login(
      req.user,
      req.headers['user-agent'],
    );
    this.authService.setTokenToHttpOnlyCookie(res, result);
    res.send(result.user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    console.log('call google auth page');
    // redirect google login page
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    this.authService.logoutHttpOnlyCookie(res);
    res.send({
      message: 'logout',
    });
  }
}
