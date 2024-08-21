import { Module } from '@nestjs/common';
import { CheckAuthGuard } from '@project/authentication';
import { PrismaClientModule } from '@project/blog-models';
import { HttpModule } from '@nestjs/axios';
import { HttpClient } from '@project/api-config';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { CommentRepository } from './comments.repository';
import { CommentFactory } from './comments.factory';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClient.Timeout,
      maxRedirects: HttpClient.MaxRedirects,
    }),
    PrismaClientModule
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentFactory, CheckAuthGuard],
  exports: [CommentRepository, CommentFactory]
})
export class CommentsModule {}
