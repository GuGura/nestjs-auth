import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { PlateModule } from './plate/plate.module';
import { ImageUploadModule } from './image-upload/image-upload.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ImageUploadModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 60,
        skipIf: () => {
          return !!process.env.NODE_ENV === false;
        },
      },
    ]),
    PlateModule,
    ImageUploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, //Rate Limiter 가드
    },
  ],
})
export class AppModule {}
