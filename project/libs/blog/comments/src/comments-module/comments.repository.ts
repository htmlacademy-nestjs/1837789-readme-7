import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment, PaginationResult, SortDirection } from "@project/core";
import { PrismaClientService } from '@project/blog-models';
import { CommentQuery } from "./comment.query";
import { CommentEntity } from './comments.entity';
import { CommentFactory } from './comments.factory';
import { BasePostgresRepository } from '@project/data-access';
import { CommentLength } from "./comments.constant";

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
      where: { id },
    });

    if (!document) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: { id }
    });
  }

  public async findByPostId(postId: string, query?: CommentQuery): Promise<PaginationResult<CommentEntity>> {
    const [records, commentsCount] = await Promise.all([
      this.client.comment.findMany({
        where: { postId },
        orderBy: { createdAt: SortDirection.Desc },
        skip: (query.page - 1) * CommentLength.MaxCount,
        take: CommentLength.MaxCount
      }),
      this.client.comment.count({ where: { postId } })
    ]);

    return {
      entities: records.map(record => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: Math.ceil(commentsCount / CommentLength.MaxCount),
      itemsPerPage: CommentLength.MaxCount,
      totalItems: commentsCount
    };
  }
}
