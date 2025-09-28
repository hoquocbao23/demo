// email/resend.provider.ts
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

export const RESEND_CLIENT = 'RESEND_CLIENT';

export const ResendProvider: Provider = {
  provide: RESEND_CLIENT,
  useFactory: (cfg: ConfigService) => {
    const key = cfg.get<string>('RESEND_API');
    console.log('key', key);
    if (!key) throw new Error('Missing RESEND_API_KEY');
    return new Resend(key);
  },
  inject: [ConfigService],
};
