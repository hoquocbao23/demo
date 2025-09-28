import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';
import { RESEND_CLIENT } from './resend.provider';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    @Inject(RESEND_CLIENT) private readonly resend: Resend,
  ) {
  }

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
    
    const { data, error } = await this.resend.emails.send({
      from: this.configService.get('MAILER_USER') || 'Acme <onboarding@resend.dev>',
      to: [email], 
      subject: 'hello world',
      html: '<p>it works!</p>',
      replyTo: 'onboarding@resend.dev',
    });
    return { data, error };
  }



  
}
