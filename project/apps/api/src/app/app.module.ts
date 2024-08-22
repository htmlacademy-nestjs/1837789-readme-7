import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiModule, HttpClient } from '@project/api-config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from '@project/authentication';
import { BlogController } from './blog.controller';
import { CommentController } from './comments.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/helpers';
import { NotifyController } from './notify.controller';
import { UsersService } from './users.service';
import { BlogService } from './blog.service';

@Module({
  imports: [
    ApiModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    ),
    HttpModule.register({
      timeout: HttpClient.Timeout,
      maxRedirects: HttpClient.MaxRedirects,
    }),
  ],
  controllers: [
    UsersController,
    BlogController,
    CommentController,
    NotifyController
  ],
  providers: [UsersService, BlogService, CheckAuthGuard],
})
export class AppModule {}
