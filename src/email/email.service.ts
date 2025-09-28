import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    email: string,
    subject: string,
    template: string,
    context: any,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      template: template,
      context: context,
    });
  }

  async sendPassword(email: string, password: string) {
    await this.sendEmail(email, 'Mật khẩu của bạn', './password', { password });
  }
}
