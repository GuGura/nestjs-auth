import { Body, Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll() {
    return 'all';
  }
  @Get('add-user-test')
  async create(
    @Body() data: { email: string; password: string; name: string },
  ) {
    await this.userService.createLocalAccount({
      email: 'a@gmail.com',
      password: '12345678',
      name: 'test',
    });
    return data;
  }
}
