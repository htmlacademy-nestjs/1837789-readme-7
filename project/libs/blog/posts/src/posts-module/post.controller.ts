import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard, RequestWithUser } from '@project/authentication';
import { fillDto } from '@project/helpers';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRdo } from './rdo/post.rdo';
import { PostQuery } from './post.query';
import { PostWithPaginationRdo } from './rdo/post-with-pagination.rdo';
import { CreateCommentDto, CommentRdo } from '@project/comments';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostResponseMessage, QueryDescription, Default } from './post.constant';
import { InjectUserIdInterceptor } from '@project/interceptors';

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
  @ApiQuery({ type: PostQuery, description: QueryDescription.PaginationList })
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
  @ApiBody({ type: CreatePostDto })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
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

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @Post('/repost/:postId')
  public async repost(@Req(){ user }: RequestWithUser, @Param('postId') postId: string): Promise<PostRdo> {
    const newPost = await this.postService.repostPost(user.id, postId);
    return fillDto(PostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.LikesCount,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound,
  })
  @UseGuards(CheckAuthGuard)
  @Get(':postId/likes')
  public async likesCount(@Param('postId') postId: string): Promise<number> {
    const count = await this.postService.getLikesCount(postId);
    return count;
  }

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: PostResponseMessage.FoundPostList
  })
  @ApiQuery({ type: 'string', description: QueryDescription.SearchedTitle })
  @Get('/search')
  public async search(@Query('title') title: string) {
    const postWithPagination = await this.postService
      .getAllPosts({ title, limit: Default.MaxSearchCount } as PostQuery);

    return postWithPagination.entities.map((blogPost) =>
      fillDto(PostRdo, blogPost.toPOJO()));
  }

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: PostResponseMessage.FoundPostList
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: PostResponseMessage.JwtAuthError
  })
  @ApiQuery({ type: 'date', description: QueryDescription.LastDate })
  @UseGuards(CheckAuthGuard)
  @Get('/find-after-date')
  public async findAfterDate(@Query('date') date: Date) {
    const posts = await this.postService.findAfterDate(date);

    return posts.map(post => fillDto(PostRdo, post.toPOJO()));
  }
}
