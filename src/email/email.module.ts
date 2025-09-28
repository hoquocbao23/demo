import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [],
      useFactory: () => ({
        transport: {
          host: process.env.MAILER_HOST,
          port: parseInt(process.env.MAILER_PORT || '587'),
          secure: false,
          requireTLS: true,
          auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD,
          },
        },
        logger: true,
        debug: true,
        defaults: {
          from: process.env.MAILER_FROM,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
