import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PaginationResult } from '@project/core';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { PostQuery } from './post.query';
import { CommentFactory, CommentRepository, CreateCommentDto, CommentEntity } from '@project/comments';
import { PostFactory } from './post.factory';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostStatus } from '@prisma/client';
import { PostValidateMessage } from './post.constant';
import { PrismaClientService } from '@project/blog-models';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
    private readonly commentFactory: CommentFactory,
    readonly client: PrismaClientService,
  ) {}

  public async getAllPosts(query?: PostQuery, isOnlyDraft = false, usersIds: string[] = []): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query, isOnlyDraft, usersIds);
  }

  public async createPost(dto: CreatePostDto): Promise<PostEntity> {
    const newPost = PostFactory.createFromCreatePostDto(dto);
    await this.postRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<PostEntity> {
    return this.postRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostEntity> {
    const existsPost = await this.postRepository.findById(id);
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existsPost;
    }

    await this.postRepository.update(existsPost);

    return existsPost;
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    const existsPost = await this.getPost(postId);
    const newComment = this.commentFactory.createFromDto(dto, existsPost.id);
    await this.commentRepository.save(newComment);

    return newComment;
  }

  public async repostPost(userId: string, postId: string): Promise<PostEntity> {
    const existPost = await this.getPost(postId);
    if (!existPost) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    if (existPost.userId === userId) {
      throw new ForbiddenException(PostValidateMessage.UserAlreadyAuthor);
    }

    if (existPost.status === PostStatus.Draft) {
      throw new ForbiddenException(PostValidateMessage.CannotRepostDraft);
    }

    const { entities } = await this.getAllPosts({userId} as PostQuery);
    for (const entity of entities) {
      if (entity.isRepost && entity.originalId === existPost.id) {
        throw new ForbiddenException(PostValidateMessage.AlreadyReposted);
      }
    }

    return await this.postRepository.repost(existPost, userId);
  }

  public async like(postId: string, userId: string) {
    const existsPost = await this.getPost(postId);
    if (!existsPost) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    if (existsPost.status !== PostStatus.Published) {
      throw new ForbiddenException(PostValidateMessage.LikeOnlyPublished);
    }

    try {
      await this.postRepository.like(existsPost.toggleLike(userId));
      return existsPost;
    } catch {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
  }

  public async findAfterDate(date: Date) {
    return await this.postRepository.findAfterDate(date);
  }
}


