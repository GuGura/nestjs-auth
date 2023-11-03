import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async cryptoPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
