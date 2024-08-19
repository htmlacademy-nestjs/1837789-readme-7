import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiModule, HttpClient } from '@project/api-config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from '@project/authentication';
import { BlogController } from './blog.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ApiModule,
    HttpModule.register({
      timeout: HttpClient.Timeout,
      maxRedirects: HttpClient.MaxRedirects,
    }),
  ],
  controllers: [
    UsersController,
    BlogController,
  ],
  providers: [UsersService, CheckAuthGuard],
})
export class AppModule {}
