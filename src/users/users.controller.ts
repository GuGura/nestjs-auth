import {
  Bind,
  Body,
  Controller,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/strategy/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  @Bind(Request())
  async getInfo(req) {
    return req.user;
  }

  @Get('add-user-test')
  @Public()
  async create(
    @Body() data: { email: string; password: string; name: string },
  ) {
    await this.userService.createLocalAccount({
      email: 'a@naver.com',
      password: '12345678',
      name: 'test',
    });
    return data;
  }
}
