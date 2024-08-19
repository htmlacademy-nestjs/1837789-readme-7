import { Body, Controller, Get, HttpStatus, HttpCode, Param, Post, Req, UseGuards, Patch } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { AuthenticationResponseMessage } from './authentication.constant';
import { MongoIdValidationPipe } from '@project/pipes';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { fillDto } from '@project/helpers';
import { NotifyService } from '@project/account-notify';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { ChangeUserPasswordDto } from '../dto/change-user-password.dto';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { RequestWithTokenPayload } from './request-with-token-payload.interface';
import { IsGuestGuard } from '../guards/is-guest.guard';
import { CreateSubscribeDto } from '../dto/create-subscribe.dto';
import { UserPublicInfoRdo } from '../rdo/user-public-info.rdo';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) {}

  @Get('/test')
  public async test() {
    console.log('test successful');
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @UseGuards(IsGuestGuard)
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, firstname, lastname } = newUser;
    await this.notifyService.registerSubscriber({ email, firstname, lastname });
    return newUser.toPOJO();
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError
  })
  @ApiBody({ type: ChangeUserPasswordDto })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('change-password')
  public async changePassword(
    @Req() { user }: RequestWithUser,
    @Body() { oldPassword, newPassword }: ChangeUserPasswordDto
  ) {
    await this.authService.changeUserPassword(user.id, oldPassword, newPassword);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound
  })
  @ApiBody({ type: CreateSubscribeDto })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('subscribe')
  public async subscribe(
    @Req() { user }: RequestWithUser,
    @Body() dto: CreateSubscribeDto
  ) {
    const userData = await this.authService.subscribe(user.id, dto.userId);
    return fillDto(UserRdo, {
      ...userData.toPOJO(),
      avatar: userData.avatarUrl ? await this.authService.getAvatar(userData.avatarUrl) : undefined
    });
  }

  @ApiResponse({
    type: [UserRdo],
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.GettingUsersById
  })
  @HttpCode(HttpStatus.OK)
  @Post('get-users-by-id')
  public async getUserList(@Body('usersIds') usersIds: string[]) {
    const users = await this.authService.getUsersByListId(usersIds);
    return users.map(user => fillDto(UserRdo, { ...user.toPOJO() }));
  }

  @ApiResponse({
    type: [UserRdo],
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.GettingPublishersList
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.JwtAuthError
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: AuthenticationResponseMessage.BadMongoIdError
  })
  @UseGuards(JwtAuthGuard)
  @Get('/get-publishers-list')
  public async getPublishersList(@Req() { user }: RequestWithUser) {
    console.log(user);
    const publishers = await this.authService.getPublishersList(user.id);
    return publishers.map(publisher => fillDto(UserRdo, { ...publisher.toPOJO() }));
  }

  @ApiResponse({
    type: UserPublicInfoRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: AuthenticationResponseMessage.BadMongoIdError
  })
  @Get('/public-info/:userId')
  public async getUserPublicInfo(@Param('userId', MongoIdValidationPipe) userId: string) {
    const user = (await this.authService.getUserById(userId)).toPOJO();

    return fillDto(UserPublicInfoRdo, { ...user, subscribers: user.subscribers.length });
  }
}
