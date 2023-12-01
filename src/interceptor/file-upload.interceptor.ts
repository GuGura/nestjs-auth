import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const S3 = new S3Client({
  region: 'auto',
  endpoint: `${process.env.ENDPOINT}`,
  credentials: {
    accessKeyId: `${process.env.ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
  },
});

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  /*
  1. intercept() 메서드는 ExecutionContext를 인수로 받습니다.
  2. ExecutionContext는 Http, Rpc, GraphQL 등 다양한 컨텍스트를 제공합니다.
  3. 여기서는 Http 컨텍스트를 사용합니다.
  4. Http 컨텍스트는 getRequest() 메서드를 제공합니다.
  5. 이 메서드는 Express.js의 Request 객체를 반환합니다.
  6. Request 객체는 body 프로퍼티를 가지고 있습니다.
  7. body 프로퍼티는 요청의 본문을 가지고 있습니다.
  8. JSON 형식의 본문은 value 프로퍼티를 가지고 있습니다.
  9. value 프로퍼티는 배열 형식으로 되어 있습니다.
  10. 배열의 각 요소 중 이미지 요소는 type: img 를 가지고 있습니다.
  11. type: img 를 가지고 있는 요소의 url 프로퍼티는 base64 형식으로 되어 있습니다.
  12. data:image/png;base64, 를 제외한 나머지 부분이 이미지 데이터입니다.
  13. 이미지 데이터는 base64 형식으로 되어 있습니다.
  14. base64 형식의 이미지 데이터는 Buffer.from() 메서드를 사용하여 Buffer 객체로 변환합니다.
  15. Buffer 객체는 파일을 나타내는 객체입니다.
  16. PutObjectCommand 클래스의 인스턴스를 생성합니다.
  17. PutObjectCommand 클래스의 인스턴스는 S3에 업로드할 때 사용합니다.
  18. PutObjectCommand 클래스의 인스턴스는 Bucket, Key, Body, ContentType 프로퍼티를 가지고 있습니다.
  19. Bucket은 S3 버킷 이름이고 Key는 S3에 업로드할 파일의 이름이고 Body는 파일의 내용이고 ContentType은 파일의 타입입니다.
  20. S3에 업로드하면 파일의 URL을 반환합니다.
  21. uploadPromises 배열에는 S3에 업로드하는 Promise 객체가 들어 있습니다.
  22. Promise.all() 메서드는 Promise 객체의 배열을 인수로 받습니다.
  23. Promise.all() 메서드는 Promise 객체의 배열을 병렬로 실행합니다.
  24. Promise.all() 메서드는 Promise 객체의 배열의 모든 Promise 객체가 resolve되면 then() 메서드를 실행합니다.
  25. then() 메서드는 Promise 객체의 배열의 모든 Promise 객체가 resolve되면 실행됩니다.
   */
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    // console.log('request::', request);
    const body = request.body;
    const value = (body as any).contents;
    const uploadPromises: Promise<void>[] = [];
    body['firstImg'] = null;
    body['description'] = '';

    await value.map(async (item) => {
      if (item.type !== 'image') {
        const res = item.children.map((item) => {
          if (item.text.length !== 0 && body['description'].length < 40) {
            body['description'] += item.text;
          }
        });
      }
      if (item.type === 'image') {
        const [metaData, value] = item.url.split(';base64,');

        const imageBuffer = Buffer.from(value, 'base64');
        const fileName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');

        const uploadCommand = new PutObjectCommand({
          Bucket: `${process.env.BUUCKET_PLATE}`,
          Key: `plate/${fileName}`,
          Body: imageBuffer,
          ContentType: `${metaData.split(':')[1]}`,
        });

        uploadPromises.push(
          S3.send(uploadCommand)
            .then(() => {
              item.url = `${process.env.CLOUDFLARE_PUBLIC_URL}/test/plate/${fileName}`;
            })
            .catch((err) => {
              console.error('Error uploading to S3:', err);
            }),
        );

        if (body['firstImg'] === null) {
          body[
            'firstImg'
          ] = `${process.env.CLOUDFLARE_PUBLIC_URL}/test/plate/${fileName}`;
        }
      }
    });
    await Promise.all(uploadPromises);
    return next.handle();
  }
}
