import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CommentService } from './comments.service';
import { CommentRdo } from './rdo/comment.rdo';
import { fillDto } from '@project/helpers';
import { CreateCommentDto } from './dto/create-comment.dto';

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

  @Post('/')
  public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.CommentService.createComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

}
