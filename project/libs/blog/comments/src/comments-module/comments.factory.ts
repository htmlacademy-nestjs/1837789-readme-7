import { Injectable } from '@nestjs/common';

import { Comment, EntityFactory } from '@project/core';
import { CommentEntity } from './comments.entity';
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentFactory implements EntityFactory<CommentEntity> {
  public create(entityPlainData: Comment): CommentEntity {
    return new CommentEntity(entityPlainData);
  }

  public createFromDto(dto: CreateCommentDto, postId: string): CommentEntity {
    const entity = new CommentEntity();
    entity.postId = postId;
    entity.createdAt = new Date();
    entity.message = dto.message;
    entity.userId = dto.userId;
    return entity;
  }
}
