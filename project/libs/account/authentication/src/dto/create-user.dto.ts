import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

import { AuthenticationValidateMessage, NameLength } from '../authentication-module/authentication.constant';

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
    minLength: NameLength.Min,
    maxLength: NameLength.Max
  })
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Kotovsky',
    minLength: NameLength.Min,
    maxLength: NameLength.Max
  })
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
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
