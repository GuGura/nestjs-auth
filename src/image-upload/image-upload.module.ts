import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';

@Module({
  providers: [ImageUploadService],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
