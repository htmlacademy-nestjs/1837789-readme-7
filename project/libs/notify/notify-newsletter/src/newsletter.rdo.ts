import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NewsletterRdo {
  @ApiProperty({
    description: 'Date of last mailing',
    example: new Date('2024-09-15')
  })
  @Expose()
  public lastMailingDate: Date;
}
