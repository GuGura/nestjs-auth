import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlateRepository {
  constructor(private prisma: PrismaService) {}

  async getPost(id: string) {
    return this.prisma.posts.findFirst({
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

  async savePost(
    content: any,
    title: string,
    category: string,
    firstImg: string,
    description: string,
  ) {
    await this.prisma.posts.create({
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

  async getListTypePagination(
    skip: number,
    pageSize: number,
    whereConditions: { category?: string },
    orderByConditions: { createAt?: 'asc' | 'desc' },
  ) {
    return this.prisma.posts.findMany({
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
  }

  async getCountByCategory(whereConditions: { category?: string }) {
    return this.prisma.posts.count({
      where: whereConditions,
    });
  }
}
