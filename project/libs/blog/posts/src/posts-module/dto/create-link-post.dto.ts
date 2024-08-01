import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateLinkPostDto {
  @ApiProperty({
    description: 'Link url',
    example: 'https://15.design.htmlacademy.pro/static/avatar/4.jpg'
  })
  @IsString()
  @IsNotEmpty()
  public urlLink: string;

  @ApiProperty({
    description: 'Link description',
    example: 'This is an amazing place!'
  })
  @IsString()
  @IsOptional()
  public description: string;
}
