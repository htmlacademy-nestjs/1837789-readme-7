import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationResult } from '@project/core';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { PostQuery } from './post.query';
import { CommentFactory, CommentRepository, CreateCommentDto, CommentEntity } from '@project/comments';
import { PostFactory } from './post.factory';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
    private readonly commentFactory: CommentFactory,
  ) {}

  public async getAllPosts(query?: PostQuery): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query);
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

    existPost.updatedAt = new Date();
    existPost.userId = userId;
    existPost.isRepost = true;
    await this.postRepository.save(existPost);

    return existPost;
  }

  public async getLikesCount(postId: string): Promise<number> {
    const existPost = await this.getPost(postId);
    const likesCount = existPost.likes.length;

    return likesCount;
  }
}


