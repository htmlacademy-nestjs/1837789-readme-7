import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostFactory } from './post.factory';
import { CommentsModule } from '@project/comments';
@Module({
  imports: [CommentsModule, PrismaClientModule],
  controllers: [PostController],
  providers: [PostRepository, PostService, PostFactory],
  exports: [PostService],
})
export class PostsModule {}
