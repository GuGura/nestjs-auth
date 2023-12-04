import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  Query,
} from '@nestjs/common';
import { PlateService } from './plate.service';
import { Public } from '../auth/strategy/public.decorator';
import { FileUploadInterceptor } from '../interceptor/file-upload.interceptor';

@Controller('plate')
@Public()
export class PlateController {
  constructor(private plateService: PlateService) {}

  @Get('post')
  async post(@Query('id') id: string) {
    const res = await this.plateService.getPost(id);
    return {
      res,
      readonly: true,
    };
  }

  @Get('posts')
  async posts() {
    const res = await this.plateService.getPosts();
    return {
      res,
      readonly: true,
    };
  }

  @Get('list')
  async list() {
    return this.plateService.getList();
  }

  @Post('post')
  @UseInterceptors(FileUploadInterceptor)
  async savePost(@Body() value: any) {
    if (value.title.trim().length === 0) return null;
    return await this.plateService.savePost(value);
  }
}
