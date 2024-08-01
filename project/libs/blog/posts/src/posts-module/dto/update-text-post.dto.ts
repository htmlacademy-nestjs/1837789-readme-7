import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';


export class UpdateTextPostDto {
  @ApiProperty({
    description: 'Post name',
    example: 'Dream house'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'This is an amazing place!'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public annoncement?: string;

  @ApiProperty({
    description: 'Post text',
    example: 'This is an amazing place!'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text?: string;
}
