import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostFactory } from './post.factory';
import { CommentsModule } from '@project/comments';
import { HttpModule } from '@nestjs/axios';
import { HttpClient } from '@project/api-config';
import { CheckAuthGuard } from '@project/authentication';
@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClient.Timeout,
      maxRedirects: HttpClient.MaxRedirects,
    }),
    CommentsModule,
    PrismaClientModule
  ],
  controllers: [PostController],
  providers: [PostRepository, PostService, PostFactory, CheckAuthGuard],
  exports: [PostService],
})
export class PostsModule {}
