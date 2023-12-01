import { Injectable } from '@nestjs/common';
import { PlateRepository } from './plate.repository';

@Injectable()
export class PlateService {
  constructor(private plateRepository: PlateRepository) {}

  async getPost() {
    return 'post';
  }
  async getPosts(): Promise<any> {
    return this.plateRepository.getPosts();
  }
  async savePost(value: any) {
    return await this.plateRepository.savePost(value);
  }
}
