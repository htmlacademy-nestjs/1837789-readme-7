import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationResult, CommonPost, PostType, PostStatus } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/blog-models';

import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { PostQuery } from './post.query';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, CommonPost> {
  constructor(
    entityFactory: PostFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client)
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: PostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        comments: {
          connect: [],
        }
      }
    });

    entity.id = record.id;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    });
  }

  public async findById(id: string): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
      }
    });

    if (! document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument({ ...document, type: document.type as PostType, status: document.status as PostStatus, originalId: null } as CommonPost);
  }

  public async update(entity: PostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        title: pojoEntity.title,
        type: pojoEntity.type,
        status: pojoEntity.status,
        tags: pojoEntity.tags
      },
      include: { comments: true }
    });
  }

  public async find(query?: PostQuery, isOnlyDraft = false, usersIds: string[] = []): Promise<PaginationResult<PostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};
    where.status = isOnlyDraft ? PostStatus.Draft : PostStatus.Published;

    if (usersIds?.length > 0) {
      where.userId = { in: usersIds };
    }


    if (query?.sortByComments) {
      orderBy.comments = { _count: query.sortByComments };
    } else if (query?.sortByLikes) {
      orderBy.likesCount = query.sortByLikes;
    } else if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    if (query?.title) {
      where.title = { contains: query.title, mode: 'insensitive' };
    }

    if (query?.type) {
      where.type = query.type;
    }

    if (query?.userId) {
      where.userId = query.userId;
    }

    if (query?.tag) {
      where.tags = { has: query.tag };
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: {
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record as CommonPost)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  public async findAfterDate(date: Date): Promise<PostEntity[]> {
    const posts = await this.client.post.findMany({
      where: { createdAt: { gt: date }, status: PostStatus.Published },
      include: { comments: true }
    });

    return posts.map(post => this.createEntityFromDocument(post as CommonPost));
  }

  public async repost(entity: PostEntity, userId: string): Promise<PostEntity> {
    const { id, ...pojoEntity } = entity.toPOJO();

    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        originalId: id,
        userId,
        originalUserId: entity.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isRepost: true,
        comments: {
          connect: []
        },
      }
    });

    return this.createEntityFromDocument(record as CommonPost);
  }

  public async like(entity: PostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: { likes: pojoEntity.likes, likesCount: pojoEntity.likesCount }
    });
  }
}
