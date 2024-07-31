import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoPostDto {
  @ApiProperty({
    description: 'Post name',
    example: 'Dream house'
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    description: 'Video link',
    example: 'user@user.ru'
  })
  @IsString()
  @IsNotEmpty()
  public urlVideo: string;
}
