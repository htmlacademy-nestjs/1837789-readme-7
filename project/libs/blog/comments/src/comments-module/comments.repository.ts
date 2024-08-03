import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import { Comment } from '@project/core';

import { CommentEntity } from './comments.entity';
import { CommentFactory } from './comments.factory';
import { BasePostgresRepository } from '@project/data-access';

@Injectable()
export class CommentRepository extends BasePostgresRepository<CommentEntity, Comment> {
  constructor(
    entityFactory: CommentFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: CommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
  }

  public async findById(id: string): Promise<CommentEntity> {
    const document = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (! document) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      }
    });
  }

  public async findByPostId(postId: string): Promise<CommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        postId
      }
    });

    return records.map(record => this.createEntityFromDocument(record))
  }
}
