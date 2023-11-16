import { Module } from '@nestjs/common';
import { PlateController } from './plate.controller';
import { PlateService } from './plate.service';
import { PlateRepository } from './plate.repository';
import { ImageUploadModule } from '../image-upload/image-upload.module';

@Module({
  imports: [ImageUploadModule],
  controllers: [PlateController],
  providers: [PlateService, PlateRepository],
})
export class PlateModule {}
