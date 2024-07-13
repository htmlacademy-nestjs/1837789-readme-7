export enum PostType {
  Video = 'video',
  Text = 'text',
  Quotation = 'quotation',
  Photo = 'photo',
  Link = 'link'
}


export type VideoPost = {
  type: PostType.Video;
  name: string;
  urlVideo: string;
  tags?: string[];
}

export type TextPost = {
  type: PostType.Text;
  name: string;
  title: string;
  text: string;
  tags?: string[];
}

export type QuotationPost = {
  type: PostType.Quotation;
  text: string;
  author: string;
  tags?: string[];
}

export type PhotoPost = {
  type: PostType.Photo;
  photo: string;
  tags?: string[];
}

export type LinkPost = {
  type: PostType.Link;
  url: string;
  tags?: string[];
  description?: string;
}
