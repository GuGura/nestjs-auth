import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(): void {
    this.mailerService
      .sendMail({
        to: 'woduszmfltma@naver.com',
        from: 'wodus331@gmail.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then(() => {
        return 'success';
      })
      .catch(() => {
        return 'fail';
      });
  }
}
