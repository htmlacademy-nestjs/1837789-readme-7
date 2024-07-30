import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';

import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { CommentRepository } from './comments.repository';
import { CommentFactory } from './comments.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentFactory],
})
export class CommentsModule {}
