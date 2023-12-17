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
import { MailService } from '../mail/mail.service';

@Controller('plate')
@Public()
export class PlateController {
  constructor(
    private plateService: PlateService,
    private mailService: MailService,
  ) {}

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
    return this.plateService.getList(page, pageSize, filter);
  }

  @Post('post')
  @UseInterceptors(FileUploadInterceptor)
  async savePost(@Body() value: any) {
    if (value.title.trim().length === 0)
      throw new HttpException('Title is Empty', HttpStatus.BAD_REQUEST);
    return await this.plateService.savePost(value);
  }

  @Get()
  testMail(): void {
    return this.mailService.sendMail();
  }
  @Get('oauth')
  testOAuthMail() {
    return this.mailService.sendOAuth2('woduszmfltma@naver.com');
  }

  @Get('oauth2')
  testOAuthMail2() {
    return this.mailService.sendMailV2();
  }
}
