import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuotationPostDto {
  @ApiProperty({
    description: 'Quotation text',
    example: 'You cannot solve a problem at the same level at which it originated.'
  })
  @IsString()
  @IsNotEmpty()
  public text: string;

  @ApiProperty({
    description: 'The quotation author',
    example: 'Albert Einstein',
  })
  @IsString()
  @IsNotEmpty()
  public author: string;
}
