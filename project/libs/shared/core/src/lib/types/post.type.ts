import { Comment } from './comment.type';

export enum PostType {
  Video = 'Video',
  Text = 'Text',
  Quotation = 'Quotation',
  Photo = 'Photo',
  Link = 'Link'
}

export enum PostStatus {
  Published = 'Published',
  Draft = 'Draft'
}

export type Post = {
  id?: string;
  originalId: string | null;
  type: PostType;
  status: PostStatus;
  userId: string;
  originalUserId?: string | null;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  isRepost?: boolean;
  tags?: string[];
  likes?: string[];
  comments?: Comment[];
}

export type VideoPost = Post & {
  name: string;
  urlVideo: string;
}

export type TextPost = Post & {
  name: string;
  annoncement: string;
  text: string;
}

export type QuotationPost = Post & {
  textQuotation: string;
  authorQuotation: string;
}

export type PhotoPost = Post & {
  photo: string;
}

export type LinkPost = Post & {
  urlLink: string;
  description?: string;
}

export type OncePost = VideoPost | TextPost | QuotationPost | PhotoPost | LinkPost;

export type CommonPost = {
  id?: string;
  originalId: string | null;
  type: PostType;
  status: PostStatus;
  userId: string;
  originalUserId?: string | null;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  isRepost?: boolean;
  tags?: string[];
  likes?: string[];
  likesCount?: number;
  comments?: Comment[];

  name?: string;
  urlVideo?: string;
  annoncement?: string;
  text?: string;
  textQuotation?: string;
  authorQuotation?: string;
  photo?: string;
  urlLink?: string;
  description?: string;
}
