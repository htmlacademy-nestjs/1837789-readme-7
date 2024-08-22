import { Injectable, NotImplementedException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CommentFactory } from "./comments.factory";
import { CommentRepository } from './comments.repository';
import { CommentEntity } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseMessage } from './comments.constant';
import { CommentQuery } from "./comment.query";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly commentFactory: CommentFactory,
  ) {}

  getById(commentId: string) {
    return this.commentRepository.findById(commentId);
  }

  public async createComment(postId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    console.info(postId, dto);
    throw new NotImplementedException();
  }

  async create(postId: string, dto: CreateCommentDto) {
    try {
      const newComment = this.commentFactory.createFromDto(dto, postId);
      await this.commentRepository.save(newComment);

      return newComment;
    } catch (err) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
  }

  async delete(commentId: string, userId: string) {
    const existsComment = await this.commentRepository.findById(commentId);
    if (!existsComment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    if (existsComment.userId !== userId) {
      throw new ForbiddenException(CommentResponseMessage.UserNotAuthor);
    }

    return await this.commentRepository.deleteById(commentId);
  }

  async getCommentsByPostId(postId: string, query: CommentQuery) {
    return await this.commentRepository.findByPostId(postId, query);
  }
}
