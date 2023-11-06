import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategy/local.strategy';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const result = await this.authService.login(
      req.user,
      req.headers['user-agent'],
    );
    this.authService.setTokenToHttpOnlyCookie(res, result);
    res.send(result.user);
  }

  @Post('logout')
  async logout() {
    return 'logout';
  }
}
