import { SortDirection } from '@project/core';

export enum Default {
  PostCountLimit = 10,
  Sort = 'desc',
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
