import { VideoPost, TextPost, QuotationPost, PhotoPost, LinkPost, PostType, OncePostType, Entity, CommonPost } from '@project/core';
import { StorableEntity } from '@project/core';
import { CommentEntity, CommentFactory } from '@project/comments';

function isVideoType(obj: any): obj is VideoPost {
  return obj.type === PostType.Video;
}

function isTextType(obj: any): obj is TextPost {
  return obj.type === PostType.Text;
}

function isQuotationType(obj: any): obj is QuotationPost {
  return obj.type === PostType.Quotation;
}
function isPhotoType(obj: any): obj is PhotoPost {
  return obj.type === PostType.Photo;
}

function isLinkType(obj: any): obj is LinkPost {
  return obj.type === PostType.Link;
}

export class PostEntity extends Entity implements StorableEntity<CommonPost> {
  public type: PostType;
  public userId: string;
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public isRepost?: boolean;
  public tags?: string[];
  public likes?: string[];
  public comments: CommentEntity[];

  public name?: string;
  public urlVideo?: string;
  public annoncement?: string;
  public text?: string;
  public textQuotation?: string;
  public authorQuotation?: string;
  public photo?: string;
  public urlLink?: string;
  public description?: string;

  constructor(post?: CommonPost) {
    super();
    this.populate(post);
  }

  public populate(post?: CommonPost) {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.type = post.type;
    this.title = post.title;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.isRepost = post.isRepost ?? undefined;
    this.tags = post.tags ?? [];
    this.likes = post.likes ?? [];

    const blogCommentFactory = new CommentFactory();
    this.comments = post.comments?.map(comment => blogCommentFactory.create(comment)) ?? [];

    this.name = post.name ?? undefined;
    this.urlVideo = post.urlVideo ?? undefined;
    this.annoncement = post.annoncement ?? undefined;
    this.text = post.text ?? undefined;
    this.textQuotation = post.textQuotation ?? undefined;
    this.authorQuotation = post.authorQuotation ?? undefined;
    this.photo = post.photo ?? undefined;
    this.urlLink = post.urlLink ?? undefined;
    this.description = post.description ?? undefined;

    if (isVideoType(post)) {
      this.name = post.name ?? undefined;
      this.urlVideo = post.urlVideo ?? undefined;
    }

    if (isTextType(post)) {
      this.name = post.name ?? undefined;
      this.text = post.text ?? undefined;
    }

    if (isQuotationType(post)) {
      this.textQuotation = post.textQuotation ?? undefined;
      this.authorQuotation = post.authorQuotation ?? undefined;
    }

    if (isPhotoType(post)) {
      this.photo = post.photo ?? undefined;
    }

    if (isLinkType(post)) {
      this.urlLink = post.urlLink ?? undefined;
      this.description = post.description ?? undefined;
    }

  }

  public toPOJO(): OncePostType {
    const basePost: { [key: string]: any } = {
      id: this.id,
      type: this.type,
      userId: this.userId,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isRepost: this.isRepost,
      tags: this.tags,
      likes: this.likes,
      comments: this.comments?.map(comment => comment.toPOJO()) ?? []
    };

    if (isVideoType(this)) {
      basePost.name = this.name;
      basePost.urlVideo = this.urlVideo;
    }

    if (isTextType(this)) {
      basePost.name = this.name;
      basePost.text = this.text;
    }

    if (isQuotationType(this)) {
      basePost.text = this.text;
      basePost.authorQuotation = this.authorQuotation;
    }

    if (isPhotoType(this)) {
      basePost.photo = this.photo;
    }

    if (isLinkType(this)) {
      basePost.urlLink = this.urlLink;
      basePost.description = this.description;
    }

    return basePost as OncePostType;
  }
}
