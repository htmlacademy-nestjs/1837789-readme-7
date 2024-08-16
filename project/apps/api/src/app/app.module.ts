import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import {
  HttpClientConsts
} from './app.config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClientConsts.Timeout,
      maxRedirects: HttpClientConsts.MaxRedirects,
    }),
  ],
  controllers: [
    UsersController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
