import { ApiProperty } from '@nestjs/swagger';
import { PostType, PostStatus } from '@prisma/client';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Post types enum',
    enum: PostType,
    example: PostType.Text
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  @IsOptional()
  public type: PostType;

  @ApiProperty({
    description: 'Post statuses enum',
    enum: PostStatus,
    example: PostStatus.Published
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  @IsOptional()
  public status: PostStatus;

  @ApiProperty({
    description: 'Post user ID',
    example: '661022d3615ce5c3c722054f'
  })
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  public userId: string;

  @ApiProperty({
    description: 'A great time of victory!',
    example: 'Some post title'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title: string;

  @ApiProperty({
    description: 'Post tags list',
    isArray: true,
    example: ['#aaa', '#bbb']
  })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  public tags?: string[];

  @ApiProperty({
    description: 'Post name',
    example: 'Dream house'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @ApiProperty({
    description: 'Video url',
    example: 'https://15.design.htmlacademy.pro/static/avatar/4.jpg'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public urlVideo: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'This is an amazing place!'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public annoncement: string;

  @ApiProperty({
    description: 'Post text',
    example: 'This is an amazing place!'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text: string;

  @ApiProperty({
    description: 'Quotation text',
    example: 'You cannot solve a problem at the same level at which it originated.'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public textQuotation: string;

  @ApiProperty({
    description: 'The quotation author',
    example: 'Albert Einstein',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public authorQuotation: string;

  @ApiProperty({
    description: 'Post photo path',
    example: 'https://15.design.htmlacademy.pro/static/avatar/4.jpg'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public photo: string;

  @ApiProperty({
    description: 'Link url',
    example: 'https://15.design.htmlacademy.pro/static/avatar/4.jpg'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public urlLink: string;

  @ApiProperty({
    description: 'Link description',
    example: 'This is an amazing place!'
  })
  @IsString()
  @IsOptional()
  public description: string;
}
