import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';

import { CreateUserDto } from '../dto/create-user.dto';
import { AuthenticationResponseMessage } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
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
      throw new ConflictException(AuthenticationResponseMessage.UserExist);
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
      throw new NotFoundException(AuthenticationResponseMessage.UserNotFound);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthenticationResponseMessage.LoggedError);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (! user) {
      throw new NotFoundException(AuthenticationResponseMessage.UserNotFound);
    }

    return user;
  }
}
