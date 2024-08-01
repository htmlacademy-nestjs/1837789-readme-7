import { PostType, Entity, CommonPost, StorableEntity } from '@project/core';
import { CommentEntity, CommentFactory } from '@project/comments';

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

  }

  public toPOJO(): CommonPost {
    return {
      id: this.id,
      type: this.type,
      userId: this.userId,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isRepost: this.isRepost,
      tags: this.tags,
      likes: this.likes,
      comments: this.comments?.map(comment => comment.toPOJO()) ?? [],

      name: this.name,
      urlVideo: this.urlVideo,
      annoncement: this.annoncement,
      text: this.text,
      textQuotation: this.textQuotation,
      authorQuotation: this.authorQuotation,
      photo: this.photo,
      urlLink: this.urlLink,
      description: this.description
    };
  }
}
