import { Module } from '@nestjs/common';
import { PlateController } from './plate.controller';
import { PlateService } from './plate.service';
import { PlateRepository } from './plate.repository';

@Module({
  controllers: [PlateController],
  providers: [PlateService, PlateRepository],
})
export class PlateModule {}