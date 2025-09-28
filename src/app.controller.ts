import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly emailService: EmailService  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('email')
  sendEmail(): Promise<void> {
    return this.emailService.sendPassword('test@test.com', '123456');
  }
}
