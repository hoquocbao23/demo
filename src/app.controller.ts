import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly emailService: EmailService,
    private readonly configService: ConfigService,
   ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('email')
  sendEmail(): Promise<void> {
    console.log ('sendEmail', this.configService.get('MAILER_HOST'));
    console.log ('sendEmail', this.configService.get('MAILER_PORT'));
    console.log ('sendEmail', this.configService.get('MAILER_USER'));
    console.log ('sendEmail', this.configService.get('MAILER_PASSWORD'));
    console.log ('sendEmail', this.configService.get('MAILER_FROM'));
    return this.emailService.sendPassword('hoquocbaold@gmail.com', '123456');
  }
}
