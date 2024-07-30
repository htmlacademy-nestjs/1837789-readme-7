import { Injectable } from '@nestjs/common';

import { Comment, EntityFactory } from '@project/core';
import { CommentEntity } from './comments.entity';

@Injectable()
export class CommentFactory implements EntityFactory<CommentEntity> {
  public create(entityPlainData: Comment): CommentEntity {
    return new CommentEntity(entityPlainData);
  }
}
