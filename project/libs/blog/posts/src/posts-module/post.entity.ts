import { PostType, Entity, CommonPost, StorableEntity, PostStatus } from '@project/core';
import { CommentEntity, CommentFactory } from '@project/comments';

export class PostEntity extends Entity implements StorableEntity<CommonPost> {
  public originalId: string | null;
  public type: PostType;
  public status: PostStatus;
  public userId: string;
  public originalUserId: string | null;
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public isRepost?: boolean;
  public tags?: string[];
  public likes?: string[];
  public likesCount?: number;
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
    this.originalId = post.originalId ?? null;
    this.type = post.type;
    this.status = post.status;
    this.userId = post.userId ?? undefined;
    this.originalUserId = post.originalUserId ?? null;
    this.title = post.title;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.isRepost = post.isRepost ?? undefined;
    this.tags = post.tags ?? [];
    this.likes = post.likes ?? [];
    this.likesCount = post.likesCount;

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

  public toggleLike(userId: string) {
    if (this.likes.includes(userId)) {
      this.likes = this.likes.filter(id => id !== userId);
    } else {
      this.likes.push(userId);
    }

    this.likesCount = this.likes.length;

    return this;
  }

  public toPOJO(): CommonPost {
    return {
      id: this.id,
      originalId: this.originalId,
      type: this.type,
      status: this.status,
      userId: this.userId,
      originalUserId: this.originalUserId,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isRepost: this.isRepost,
      tags: this.tags,
      likes: this.likes,
      likesCount: this.likesCount,
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
