import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
