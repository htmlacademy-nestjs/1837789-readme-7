export enum PostType {
  VideoPost = 'videoPost',
  TextPost = 'textPost',
  QuotationPost = 'quotationPost',
  PhotoPost = 'photoPost',
  LinkPost = 'linkPost'
}


export type TVideoPost = {
  type: PostType.VideoPost;
  name: string;
  urlVideo: string;
  tags?: string[];
}

export type TTextPost = {
  type: PostType.TextPost;
  name: string;
  title: string;
  text: string;
  tags?: string[];
}

export type TQuotationPost = {
  type: PostType.QuotationPost;
  text: string;
  author: string;
  tags?: string[];
}

export type TPhotoPost = {
  type: PostType.PhotoPost
  photo: string;
  tags?: string[];
}

export type TLinkPost = {
  type: PostType.LinkPost;
  url: string;
  tags?: string[];
  description?: string;
}
