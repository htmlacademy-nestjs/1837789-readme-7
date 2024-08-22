import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ParamDescription, CommentResponseMessage } from './comments.constant';
import { CommentService } from './comments.service';
import { CommentRdo } from './rdo/comment.rdo';
import { CheckAuthGuard, RequestWithUser } from '@project/authentication';
import { fillDto } from '@project/helpers';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { CommentWithPaginationRdo } from './rdo/comment-with-pagination.rdo';
import { CommentQuery } from './comment.query';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: CommentResponseMessage.CommentCreated
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: CommentResponseMessage.CommentValidationError
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseMessage.PostNotFound
  })
  @ApiParam({ name: "postId", required: true, description: ParamDescription.PostId })
  @ApiBody({ type: CreateCommentDto })
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckAuthGuard)
  @Post('/')
  public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.create(postId, dto);

    return fillDto(CommentRdo, { ...newComment.toPOJO() })
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: CommentResponseMessage.CommentDeleted
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseMessage.CommentNotFound
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: CommentResponseMessage.UserNotAuthor
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: CommentResponseMessage.JwtAuthError
  })
  @ApiParam({ name: "commentId", required: true, description: ParamDescription.CommentId })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:commentId')
  public async deleteComment(@Req() { user }: RequestWithUser, @Param('commentId') commentId: string) {
    return this.commentService.delete(commentId, user.id);
  }

  @ApiResponse({
    type: CommentWithPaginationRdo,
    status: HttpStatus.OK,
    description: CommentResponseMessage.FoundCommentList
  })
  @ApiParam({ name: "postId", required: true, description: ParamDescription.PostId })
  @Get('/find')
  public async getCommentsByPostId(@Param('postId') postId: string, @Query() query: CommentQuery) {
    const data = await this.commentService.getCommentsByPostId(postId, query);

    const result = {
      ...data,
      entities: data.entities.map(comment => fillDto(CommentRdo, { ...comment.toPOJO() }))
    };

    return fillDto(CommentWithPaginationRdo, result);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: CommentResponseMessage.CommentFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseMessage.CommentNotFound
  })
  @ApiParam({ name: "commentId", required: true, description: ParamDescription.CommentId })
  @Get('/:commentId')
  public async getById(@Param('commentId') commentId: string) {
    const comment = await this.commentService.getById(commentId);

    return fillDto(CommentRdo, { ...comment.toPOJO() });
  }
}
