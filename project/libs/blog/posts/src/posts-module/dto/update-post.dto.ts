import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/client';
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
  public type?: PostType;

  @ApiProperty({
    description: 'Post user ID',
    example: '661022d3615ce5c3c722054f'
  })
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  public userId?: string;

  @ApiProperty({
    description: 'A great time of victory!',
    example: 'Some post title'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Post tags list',
    isArray: true,
    example: ['#aaa', '#bbb']
  })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  public tags?: string[];
}
