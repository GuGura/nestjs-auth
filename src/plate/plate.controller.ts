import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  Request,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { PlateService } from './plate.service';
import { Public } from '../auth/strategy/public.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';
import { extname } from 'path';
import { FileUploadInterceptor } from '../interceptor/file-upload.interceptor';

@Controller('plate')
@Public()
export class PlateController {
  constructor(private plateService: PlateService) {}

  @Get('post')
  async post() {
    return await this.plateService.getPost();
  }

  @Post('post')
  // @UseInterceptors(
  //   FilesInterceptor('value{}', 30, {
  //     storage: multerS3({
  //       s3: new S3Client({
  //         region: 'auto',
  //         credentials: {
  //           accessKeyId: `${process.env.ACCESS_KEY_ID}`,
  //           secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
  //         },
  //       }),
  //       bucket: 'test',
  //       acl: 'public-read',
  //       key: (req, file, cb) => {
  //         console.log('req::', file);
  //         console.log('file::', file);
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //
  //         const data = new Date();
  //         const year = data.getFullYear();
  //         const month = String(data.getMonth() + 1).padStart(2, '0');
  //
  //         const path = `${year}/${month}/`;
  //         const ext = extname(file.originalname);
  //         cb(null, `upload/user/${path}${randomName}${ext}`);
  //       },
  //     }),
  //     fileFilter: (req, file, cb) => {
  //       if (
  //         file.mimetype === 'image/png' ||
  //         file.mimetype === 'image/jpg' ||
  //         file.mimetype === 'image/jpeg' ||
  //         file.mimetype === 'image/svg+xml'
  //       ) {
  //         cb(null, true);
  //       } else {
  //         cb(new Error('Invalid file type'), false);
  //       }
  //     },
  //     limits: {
  //       fileSize: 300000 * 300000,
  //     },
  //   }),
  // )
  @UseInterceptors(FileUploadInterceptor)
  async savePost(@Body() value: any) {
    console.log('savePost');
    // console.log('req::', req);
    console.log('value::', value);
    // return await this.plateService.savePost(value);
  }
}
