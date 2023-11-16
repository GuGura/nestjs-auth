import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ImageUploadService {
  getS3Client() {
    return new S3Client({
      endpoint:
        'https://4893d737c0b9e484dfc37ec392b5fa8a.r2.cloudflarestorage.com',
      credentials: {
        accessKeyId: '7dc27c125a22ad808cd01df8ec309d41',
        secretAccessKey:
          '1aa5c5b0c43defdb88f567487c071d17e234126133444770a706ae09336c57a4',
      },
      region: 'auto',
    });
  }
}
