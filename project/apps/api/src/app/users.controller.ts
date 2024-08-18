import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UseFilters, UseGuards, Patch } from '@nestjs/common';
import { LoginUserDto } from '@project/authentication';
import { ApplicationServiceURL } from '@project/api-config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard, ChangeUserPasswordDto } from '@project/authentication';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Patch('change-password')
  public async changePassword(@Body() changeUserPasswordDto: ChangeUserPasswordDto) {
    await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/change-password`, changeUserPasswordDto);
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }
}
