import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

import { SortDirection } from '@project/core';
import { PostType } from '@project/core';

import {
  DEFAULT_SORT_DIRECTION,
  Default
} from './post.constant';


export class PostQuery {
  @Transform(({ value }) => +value || Default.PostCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = Default.PostCountLimit;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || Default.PageCount)
  @IsOptional()
  public page: number = Default.PageCount;

  @IsString()
  @IsOptional()
  public title: string;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortByLikes: SortDirection;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortByComments: SortDirection;

  @IsString()
  @IsEnum(PostType)
  @IsOptional()
  public type: PostType;

  @IsString()
  @IsMongoId()
  @IsOptional()
  public userId: string;

  @IsString()
  @IsOptional()
  public tag: string;
}
