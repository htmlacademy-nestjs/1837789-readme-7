import { Comment } from './comment.type';
import { Like } from './like.type';

export enum PostType {
  Video = 'video',
  Text = 'text',
  Quotation = 'quotation',
  Photo = 'photo',
  Link = 'link'
}

export type Post = {
  id: string;
  type: PostType;
  userId: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  isRepost?: boolean;
  tags?: string[];
  comments?: Comment[];
  likes?: Like[];
}

export type VideoPost = Post & {
  name: string;
  urlVideo: string;
}

export type TextPost = Post & {
  name: string;
  title: string;
  text: string;
}

export type QuotationPost = {
  text: string;
  author: string;
}

export type PhotoPost = {
  photo: string;
}

export type LinkPost = {
  url: string;
  description?: string;
}
