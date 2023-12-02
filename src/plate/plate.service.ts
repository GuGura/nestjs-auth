import { Injectable } from '@nestjs/common';
import { PlateRepository } from './plate.repository';

@Injectable()
export class PlateService {
  constructor(private plateRepository: PlateRepository) {}

  async getPost(id: string) {
    return this.plateRepository.getPost(id);
  }

  async getList() {
    return this.plateRepository.getList();
  }
  async getPosts(): Promise<any> {
    return this.plateRepository.getPosts();
  }
  async savePost(value: any) {
    return await this.plateRepository.savePost(value);
  }
}
