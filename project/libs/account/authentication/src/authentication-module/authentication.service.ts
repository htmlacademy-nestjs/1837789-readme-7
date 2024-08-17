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
import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { Token, User } from '@project/core';
import { jwtConfig } from '@project/account-config';
import { createJWTPayload } from '@project/helpers';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthUserMessage, AuthenticationResponseMessage } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const {email, firstname, lastname, password, avatarUrl} = dto;

    const blogUser = {
      email,
      firstname,
      lastname,
      avatarUrl,
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
}
