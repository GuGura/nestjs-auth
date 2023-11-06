import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategy/local.strategy';
import { Response } from 'express';
import { Public } from './strategy/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    const result = await this.authService.login(
      req.user,
      req.headers['user-agent'],
    );
    this.authService.setTokenToHttpOnlyCookie(res, result);
    res.send(result.user);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    this.authService.logoutHttpOnlyCookie(res);
    res.send({
      message: 'logout',
    });
  }
}
