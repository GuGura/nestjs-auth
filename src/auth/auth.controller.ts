import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategy/local.strategy';
import { Response } from 'express';
import { Public } from './strategy/public.decorator';
import { GoogleAuthGuard } from './strategy/google.strategy';
import { NaverAuthGuard } from './strategy/naver.strategy';
import { KaKaoAuthGuard } from './strategy/kakao.strategy';

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
  @UseGuards(GoogleAuthGuard)
  async googleAuth(): Promise<void> {
    console.log('call google auth page');
    // redirect google login page
  }

  @Get('naver')
  @UseGuards(NaverAuthGuard)
  async naverAuth(): Promise<void> {
    console.log('call naver auth page');
    // redirect google login page
  }

  @Get('kakao')
  @UseGuards(KaKaoAuthGuard)
  async kakaoAuth(): Promise<void> {
    console.log('call kakao auth page');
    // redirect google login page
  }

  @Get('kakao/callback')
  @UseGuards(KaKaoAuthGuard)
  async kakaoAuthCallback(@Req() req, @Res() res: Response): Promise<void> {
    const result = await this.authService.login(
      req.user,
      req.headers['user-agent'],
    );
    this.authService.setTokenToHttpOnlyCookie(res, result);
    res.redirect(process.env.WEB_URL);
  }

  @Get('naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverAuthCallback(@Req() req, @Res() res: Response): Promise<void> {
    const result = await this.authService.login(
      req.user,
      req.headers['user-agent'],
    );
    this.authService.setTokenToHttpOnlyCookie(res, result);
    res.redirect(process.env.WEB_URL);
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response): Promise<void> {
    const result = await this.authService.login(
      req.user,
      req.headers['user-agent'],
    );
    this.authService.setTokenToHttpOnlyCookie(res, result);
    res.redirect(process.env.WEB_URL);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    this.authService.logoutHttpOnlyCookie(res);
    res.send({
      message: 'logout',
    });
  }

  @Post('refresh')
  async refresh(@Req() req, @Res() res: Response) {
    const result = await this.authService.refresh(
      req.cookies['access'],
      req.cookies['refresh'],
      req.headers['user-agent'],
    );
    this.authService.setTokenToHttpOnlyCookie(res, result);
    res.send(result.user);
  }
}
