import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '@project/api-config';
import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { Token, User } from '@project/core';
import { jwtConfig } from '@project/account-config';
import { createJWTPayload } from '@project/helpers';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthUserMessage, AuthenticationResponseMessage } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { Types } from 'mongoose';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly httpService: HttpService,
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const {email, firstname, lastname, password, avatarUrl} = dto;

    const blogUser = {
      email,
      firstname,
      lastname,
      avatarUrl,
      registrationDate: null,
      subscribers: [],
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUserMessage.Exists);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password)

      this.blogUserRepository
      .save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserMessage.NotFound);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthUserMessage.PasswordWrong);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (! user) {
      throw new NotFoundException(AuthUserMessage.NotFound);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async changeUserPassword(userId: string, oldPassword: string, newPassword: string) {
    const existUser = await this.blogUserRepository.findById(userId);
    if (!await existUser.comparePassword(oldPassword)) {
      throw new UnauthorizedException(AuthenticationResponseMessage.UserPasswordWrong);
    }

    const userEntity = await new BlogUserEntity(existUser).setPassword(newPassword);

    this.blogUserRepository.update(userEntity);
  }

  public async subscribe(subscriberId: string, userId: string) {
    const subscriber = await this.blogUserRepository.findById(subscriberId);
    if (!subscriber) {
      throw new NotFoundException(`Subscriber user with id ${subscriberId} not found`);
    }

    const author = await this.blogUserRepository.findById(userId);
    if (!author) {
      throw new NotFoundException(`Author user with id ${userId} not found`);
    }

    await this.blogUserRepository.update(author.updateSubscribers(subscriberId));

    return author;
  }

  public async getAvatar(fileId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.FilesStorage}/${fileId}`);

    return data;
  }

  public async getUsersByListId(usersListId: string[] = []) {
    return this.blogUserRepository.findListById(
      usersListId.filter(id => Types.ObjectId.isValid(id)));
  }

  public async getPublishersList(subscriberId: string) {
    return await this.blogUserRepository.findPublishersList(subscriberId);
  }

   public async getUserById(id: string) {
    const existUser = await this.blogUserRepository.findById(id);
    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return existUser;
  }
}
