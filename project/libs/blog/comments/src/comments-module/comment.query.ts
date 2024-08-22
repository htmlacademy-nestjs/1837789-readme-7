import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { DEFAULT_PAGE_COUNT } from './comments.constant';

export class CommentQuery {
  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
