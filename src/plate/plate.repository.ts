import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlateRepository {
  constructor(private prisma: PrismaService) {}

  async getPost(id: string) {
    return this.prisma.platePost.findFirst({
      select: {
        id: true,
        title: true,
        category: true,
        content: true,
      },
      where: {
        id,
      },
    });
  }

  async getList(filter, page, pageSize) {
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

    const posts = await this.prisma.platePost.findMany({
      skip,
      take: Number(pageSize),
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        firstImg: true,
      },
      orderBy: orderByConditions,
      where: whereConditions,
    });
    const count = await this.prisma.platePost.count();

    return {
      count,
      posts,
    };
  }

  async savePost(value: any) {
    const { title, category, contents, firstImg, description } = value;
    const content = JSON.stringify(contents);
    await this.prisma.platePost.create({
      data: {
        content,
        title,
        category,
        firstImg,
        description,
      },
    });
    return true;
  }
}
