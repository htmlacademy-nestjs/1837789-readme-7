import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { BlogCommentValidateMessage } from '../comments.constant';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  public message: string;

  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidUserID })
  public userId: string;

  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidPostID })
  public postId: string;
}
