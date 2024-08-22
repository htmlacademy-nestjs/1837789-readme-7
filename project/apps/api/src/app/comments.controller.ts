import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApplicationServiceURL } from '@project/api-config';
import { CheckAuthGuard } from '@project/authentication';
import { InjectAxiosAuthorization, InjectUserIdInterceptor } from '@project/interceptors';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@Controller('posts/:postId/comments')
@UseFilters(AxiosExceptionFilter)
export class CommentController {
  constructor(private readonly httpService: HttpService) { }

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${postId}/comments`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor, InjectAxiosAuthorization)
  @Post('/')
  public async createComment(
    @Param('postId') postId: string,
    @Body() dto: any
  ) {
    const { data } = await this.httpService.axiosRef
      .post(`${ApplicationServiceURL.Blog}/${postId}/comments`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAxiosAuthorization)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:commentId')
  public async deleteComment(@Param('postId') postId: string, @Param('commentId') commentId: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${postId}/comments/${commentId}`);
    return data;
  }

  @Get('/find')
  public async getCommentsByPostId(@Param('postId') postId: string, @Query() params: any) {
    const { data } = await this.httpService.axiosRef
      .get(`${ApplicationServiceURL.Blog}/${postId}/comments/find`, { params });
    return data;
  }

  @Get('/:commentId')
  public async getById(@Param('postId') postId: string, @Param('commentId') commentId: string) {
    const { data } = await this.httpService.axiosRef
      .get(`${ApplicationServiceURL.Blog}/${postId}/comments/${commentId}`);
    return data;
  }
}
