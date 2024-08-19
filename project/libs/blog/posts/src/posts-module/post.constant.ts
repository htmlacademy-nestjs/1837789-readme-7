import { SortDirection } from '@project/core';

export enum Default {
  PostCountLimit = 10,
  MaxSearchCount = 20,
  PageCount = 1,
}

export const DEFAULT_POST_COUNT_LIMIT = 10;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const ValidationParams = {
  NameMinLength: 20,
  NameMaxLength: 50,
  TagMaxCount: 8,
  TextMinLength: 100,
  TextMaxLength: 1024,
  AnnoncementMinLength: 50,
  AnnoncementMaxLength: 255,
  TextQuotationMinLength: 20,
  TextQuotationMaxLength: 300,
  AuthorQuotationMinLength: 3,
  AuthorQuotationMaxLength: 50,
}

export const PostResponseMessage = {
  FoundPostList: 'Successfully retrieving a list of messages based on request parameters',
  PostCreated: 'The new post has been successfully created.',
  PostValidationError: 'Validation error when creating post',
  PostFound: 'Post found',
  PostNotFound: 'Post not found',
  PostDeleted: 'The post has been successfully deleted.',
  PostUpdated: 'The post has been successfully updated.',
  CommentCreated: 'The comment has been successfully created.',
  CommentValidationError: 'Validation error when creating comment',
  PostReposted: 'The post has been successfully reposted.',
  LikesCount: 'The number of likes have been counted.',
  JwtAuthError: 'Failed user authorization with jwt',
  ForbiddenReposting: 'Forbiddend reposting',
  UserNotFound: 'User not found',
} as const;

export const QueryDescription = {
  PaginationList: 'Query parameters for pagination by list of posts',
  SearchedTitle: 'Post title to search for related posts',
  LastDate: 'Last mailing date'
} as const;

export const PostValidateMessage = {
  UserNotAuthor: 'The user is not the author of this post',
  UserAlreadyAuthor: 'You are already the author of this post',
  CannotRepostDraft: 'You cannot repost posts in draft status',
  AlreadyReposted: 'You are already reposted this post',
  LikeOnlyPublished: 'You can only like published articles'
} as const;
