import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PlateService } from './plate.service';
import { Public } from '../auth/strategy/public.decorator';
import { FileUploadInterceptor } from '../interceptor/file-upload.interceptor';

@Controller('plate')
@Public()
export class PlateController {
  constructor(private plateService: PlateService) {}

  @Get('post')
  async getPostDetail(@Query('id') id: string) {
    const res = await this.plateService.getPost(id);
    return {
      res,
      readonly: true,
    };
  }

  @Get('list')
  async list(@Query() dto) {
    const { filter, page, pageSize } = dto;
    return this.plateService.getList(filter, page, pageSize);
  }

  @Post('post')
  @UseInterceptors(FileUploadInterceptor)
  async savePost(@Body() value: any) {
    if (value.title.trim().length === 0)
      throw new HttpException('Title is Empty', HttpStatus.BAD_REQUEST);
    return await this.plateService.savePost(value);
  }
}
