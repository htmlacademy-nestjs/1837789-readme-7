import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoPostDto {
  @ApiProperty({
    description: 'Post photo path',
    example: 'https://15.design.htmlacademy.pro/static/avatar/4.jpg'
  })
  @IsString()
  @IsNotEmpty()
  public photo: string;
}
