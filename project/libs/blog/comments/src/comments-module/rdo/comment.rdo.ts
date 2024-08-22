import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment ID',
    example: 'ccaf61d0-0530-4cfc-98fa-4712838d9d96'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Post ID of this comment',
    example: 'ccaf61d0-0530-4cfc-98fa-4712838d9d96'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Comment text message',
    example: 'Its a nice word and the cat feels good!.'
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'User ID of this comment',
    example: '663b6d0bf48517d912b1b267'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Date of creation of publication',
    example: '2024-08-20'
  })
  @Expose()
  public createdAt: Date;
}
