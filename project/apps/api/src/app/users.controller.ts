import { HttpService } from '@nestjs/axios';
import 'multer';
import { Body, Param, Get, Controller, UploadedFile, ParseFilePipeBuilder, Post, Req, UseFilters, UseGuards, Patch, UseInterceptors } from '@nestjs/common';
import { LoginUserDto } from '@project/authentication';
import { ApplicationServiceURL } from '@project/api-config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard, ChangeUserPasswordDto, CreateUserDto, CreateSubscribeDto } from '@project/authentication';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { Avatar } from './api.constant';
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, createUserDto)
    return data;
  }

  @Post('register-with-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  public async registerWithAvatar(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      (new ParseFilePipeBuilder())
        .addMaxSizeValidator({ maxSize: Avatar.MaxSize })
        .addFileTypeValidator({ fileType: Avatar.AvailableTypes })
        .build({ fileIsRequired: false })
    ) avatar?: Express.Multer.File
  ) {
    return this.usersService.registerWithAvatar(createUserDto, avatar);
  }

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
  @UseGuards(CheckAuthGuard)
  @Patch('subscribe')
  public async subscribe(@Body() dto: CreateSubscribeDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/subscribe`, dto);
    return data;
  }

  @Get(':userId')
  public async getUserInfo(@Param('userId') userId: string) {
    return this.usersService.getUserInfo(userId);
  }
}
