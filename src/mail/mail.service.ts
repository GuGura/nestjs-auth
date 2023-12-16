import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { createTransport } from 'nodemailer';
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

  async sendOAuth2(to = 'woduszmfltma@naver.com') {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GMAIL_CALLBACK,
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
    const token = ACCESS_TOKEN.token;
    console.log(ACCESS_TOKEN);
    const transport = createTransport({
      service: 'google',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MY_EMAIL,
        type: 'OAUTH2',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: token,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
    const from = process.env.MY_EMAIL;
    const subject = '🌻 This Is Sent By NodeMailer 🌻';
    const html = `
    <p>Hey ${to},</p>
    <p>🌻 This Is A Test Mail Sent By NodeMailer 🌻</p>
    <p>Thank you</p>
    `;
    return new Promise((resolve, reject) => {
      transport.sendMail({ from, subject, to, html }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  }
}
