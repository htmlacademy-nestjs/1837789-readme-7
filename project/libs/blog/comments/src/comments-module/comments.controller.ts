import { Controller, Get, Param } from '@nestjs/common';

import { CommentService } from './comments.service';
import { CommentRdo } from './rdo/comment.rdo';
import { fillDto } from '@project/helpers';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private readonly CommentService: CommentService,
  ) {}

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const comments = await this.CommentService.getComments(postId);
    return fillDto(CommentRdo, comments.map((comment) => comment.toPOJO()));
  }
}
