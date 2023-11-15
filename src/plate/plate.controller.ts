import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlateService } from './plate.service';
import { Public } from '../auth/strategy/public.decorator';

@Controller('plate')
@Public()
export class PlateController {
  constructor(private plateService: PlateService) {}

  @Get('post')
  async post() {
    return await this.plateService.getPost();
  }

  @Post('post')
  async savePost(@Body('value') value: any) {
    console.log('savePost');
    console.log(value);
    return await this.plateService.savePost(value);
  }
}
