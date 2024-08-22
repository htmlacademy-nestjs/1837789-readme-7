import { Body, Controller, Post, UploadedFile, ParseFilePipeBuilder, Get, Req, Delete, UseFilters, Patch, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard, RequestWithUser } from '@project/authentication';
import { CreatePostDto, UpdatePostDto } from '@project/posts';
import { ApplicationServiceURL } from '@project/api-config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { PostQuery } from '@project/posts';
import { Photo } from './api.constant';
import { BlogService } from './blog.service';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(
    private readonly httpService: HttpService,
    private readonly blogService: BlogService,
  ) { }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('create-with-img')
  public async createPostWitnImg(
    @Body() dto: CreatePostDto,
    @UploadedFile(
      (new ParseFilePipeBuilder())
        .addMaxSizeValidator({ maxSize: Photo.MaxSize })
        .addFileTypeValidator({ fileType: Photo.Type })
        .build({ fileIsRequired: false })
    ) photo?: Express.Multer.File
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/`,
      await this.blogService.savePostFile(dto, photo)
    );

    return data;
  }

  @Get('/')
  public async index(@Query() query: PostQuery) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, {query});
    return data;
  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post('/:id/comments')
  public async comments(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${id}/comments`);
    return data;
  }

  @Patch('/like/:postId')
  public async likes(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/like/${postId}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post('/repost/:postId')
  public async repost(@Req(){ user }: RequestWithUser, @Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/repost/${postId}`, { userId: user.id });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Delete('/:id')
  public async destroy(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}`, dto);
    return data;
  }

  @Get('/draft')
  public async getUserDraftPosts(@Req() { user }: RequestWithUser) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/draft`, { params: { userId: user.id } });
    return data;
  }

  @Get('/user/:userId')
  public async getUserPosts(@Param('userId') userId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/user/${userId}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get('/content-feed')
  public async contentFeed(@Req() { user }: RequestWithUser, @Query() query: PostQuery)
  {
    const { data: publishers } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/get-publishers-list`);
    const usersIds = publishers.reduce((list, publisher) => [...list, publisher.id], [user.id]);
    const { data: posts } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/ribbon`,{ params: {usersIds} });
    console.log(usersIds, posts, user, query);
    return posts;
  }
}
