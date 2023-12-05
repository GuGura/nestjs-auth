import { Injectable } from '@nestjs/common';
import { PlateRepository } from './plate.repository';

@Injectable()
export class PlateService {
  constructor(private plateRepository: PlateRepository) {}

  async getPost(id: string) {
    return this.plateRepository.getPost(id);
  }

  async getList(filter, page, pageSize) {
    return this.plateRepository.getList(filter, page, pageSize);
  }
  async savePost(value: any) {
    return await this.plateRepository.savePost(value);
  }
}
