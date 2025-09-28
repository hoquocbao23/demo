import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

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


  async sendEmailWithResend(email: string) {
    const resend = new Resend(this.configService.get('RESEND_API_KEY'));
    const { data, error } = await resend.emails.send({
      from: this.configService.get('MAILER_USER') || 'Acme <onboarding@resend.dev>',
      to: [email], 
      subject: 'hello world',
      html: '<p>it works!</p>',
      replyTo: 'onboarding@resend.dev',
    });
    return { data, error };
  }



  
}
