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

  async getList() {
    return this.prisma.platePost.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        firstImg: true,
      },
      orderBy: {
        createAt: 'desc',
      },
    });
  }

  async getPosts() {
    return this.prisma.platePost.findMany({
      select: {
        id: true,
        content: true,
      },
      orderBy: {
        createAt: 'desc',
      },
    });
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
