import { Injectable } from '@nestjs/common';
import { PlateRepository } from './plate.repository';

@Injectable()
export class PlateService {
  constructor(private plateRepository: PlateRepository) {}

  async getPost(id: string) {
    return this.plateRepository.getPost(id);
  }
  async savePost(value: any) {
    const { title, category, contents, firstImg, description } = value;
    const content = JSON.stringify(contents);

    return this.plateRepository.savePost(
      content,
      title,
      category,
      firstImg,
      description,
    );
  }

  async getList(page, pageSize, filter) {
    const skip = (page - 1) * pageSize;
    const whereConditions = {};
    const orderByConditions = {};
    if (!!filter) {
      if (!!filter.category) {
        whereConditions['category'] = filter.category;
      }
      if (!!filter.sortBy) {
        orderByConditions['createAt'] = filter.sortBy;
      }
    }
    const posts = await this.plateRepository.getListTypePagination(
      skip,
      pageSize,
      whereConditions,
      orderByConditions,
    );

    const count =
      await this.plateRepository.getCountByCategory(whereConditions);

    return {
      posts,
      count,
    };
  }
}
