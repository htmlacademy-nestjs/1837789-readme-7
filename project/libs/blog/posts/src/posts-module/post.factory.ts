import { Injectable } from "@nestjs/common";
import { CommonPost, EntityFactory, PostType } from "@project/core";
import { PostEntity } from "./post.entity";
import { TextPostEntity } from './entities/text-post.entity';
import { VideoPostEntity } from './entities/video-post.entity';
import { PhotoPostEntity } from './entities/photo-post.entity';
import { QuotationPostEntity } from './entities/quotation-post.entity';
import { LinkPostEntity } from './entities/link-post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostFactory implements EntityFactory<PostEntity> {
  public create(entityPlainData: CommonPost): PostEntity {
    return new PostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto): PostEntity {
    const post = {
      status: dto.status,
      tags: dto.tags,
      userId: dto.userId,
      title: dto.title,
      comments: [],
      likesCount: 0,
  }
  switch(dto.type) {
      case PostType.Link: return new LinkPostEntity({
          ...post,
          type: dto.type,
          urlLink: dto.urlLink,
      })
      case PostType.Photo: return new PhotoPostEntity({
          ...post,
          type: dto.type,
          photo: dto.photo,

      })
      case PostType.Quotation: return new QuotationPostEntity({
          ...post,
          type: dto.type,
          textQuotation: dto.textQuotation,
          authorQuotation: dto.authorQuotation,
      })
      case PostType.Text: return new TextPostEntity({
          ...post,
          type: dto.type,
          name: dto.name,
          annoncement: dto.annoncement,
          text: dto.text,
      })
      case PostType.Video: return new VideoPostEntity({
          ...post,
          type: dto.type,
          name: dto.name,
          urlVideo: dto.urlVideo,
      })
    }
  }
}
