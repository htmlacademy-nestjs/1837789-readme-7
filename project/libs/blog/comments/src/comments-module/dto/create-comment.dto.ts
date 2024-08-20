import { IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CommentValidateMessage, CommentLength } from '../comments.constant';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text message',
    example: 'Dry share advice obsequious asphalt green danger oven fog deceive.'
  })
  @IsString()
  @IsNotEmpty({ message: CommentValidateMessage.MessageIsEmpty })
  @MinLength(CommentLength.Min, { message: CommentValidateMessage.MessageLesserMin })
  @MaxLength(CommentLength.Max, { message: CommentValidateMessage.MessageGreaterMax })
  public message: string;

  @ApiProperty({
    description: 'Comment user ID',
    example: '661022d3615ce5c3c722054f'
  })
  @IsString()
  @IsMongoId({ message: CommentValidateMessage.InvalidID })
  public userId: string;
}
