import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { PasswordLength } from "../authentication-module/authentication.constant";

export class ChangeUserPasswordDto {
  @ApiProperty({
    description: 'Old user password',
    example: '1234567'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public oldPassword: string;

  @ApiProperty({
    description: 'New user password',
    example: '7654321'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public newPassword: string;
}
