import { Body, Controller, Post, Get, UseFilters, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from '@project/authentication';
import { CreatePostDto } from '@project/posts';
import { ApplicationServiceURL } from '@project/api-config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { PostQuery } from '@project/posts';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);
    return data;
  }

  @Get('/')
  public async index(@Query() query: PostQuery) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, {query});
    return data;
  }
}
