import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateVideoPostDto {
  @ApiProperty({
    description: 'Post name',
    example: 'Dream house'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'Video link',
    example: 'user@user.ru'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public urlVideo?: string;
}
