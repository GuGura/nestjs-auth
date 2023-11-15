import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlateRepository {
  constructor(private prisma: PrismaService) {}

  async savePost(value: any) {
    const content = JSON.stringify(value);
    await this.prisma.platePost.create({
      data: {
        content,
      },
    });
    return content;
  }
}
