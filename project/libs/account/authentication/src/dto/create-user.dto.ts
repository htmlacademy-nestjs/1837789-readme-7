import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Kotovsky'
  })
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'Valid URL',
    example: 'https://15.design.htmlacademy.pro/static/avatar/4.jpg'
  })
  @IsOptional()
  @IsString()
  public avatarUrl?: string;

  @ApiProperty({
    description: 'User password',
    example: '1234567'
  })
  @IsString()
  public password: string;
}
