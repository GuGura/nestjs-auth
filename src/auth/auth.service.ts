import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async cryptoPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
}
