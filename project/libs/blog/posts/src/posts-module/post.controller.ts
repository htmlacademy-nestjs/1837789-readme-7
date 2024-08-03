import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { fillDto } from '@project/helpers';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRdo } from './rdo/post.rdo';
import { PostQuery } from './post.query';
import { PostWithPaginationRdo } from './rdo/post-with-pagination.rdo';
import { CreateCommentDto, CommentRdo } from '@project/comments';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostResponseMessage } from './post.constant';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }

  @ApiResponse({
    type: PostWithPaginationRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.FoundPostList
  })
  @Get('/')
  public async index(@Query() query: PostQuery) {
    const postWithPagination = await this.postService.getAllPosts(query);
    const result = {
      ...postWithPagination,
      entities: postWithPagination.entities.map((blogPost) => blogPost.toPOJO())
    };

    return fillDto(PostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostResponseMessage.PostCreated
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: PostResponseMessage.PostValidationError
  })
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost(dto);
    return fillDto(PostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const postEntity = await this.postService.getPost(id);
    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostResponseMessage.PostDeleted
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostUpdated
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound
  })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.updatePost(id, dto);
    return fillDto(PostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: PostResponseMessage.CommentCreated
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: PostResponseMessage.CommentValidationError
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound
  })
  @Post('/:postId/comments')
  public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.postService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO())
  }
}
