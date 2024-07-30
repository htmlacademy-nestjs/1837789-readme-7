import { Injectable, NotImplementedException } from '@nestjs/common';

import { CommentRepository } from './comments.repository';
import { CommentEntity } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly blogCommentRepository: CommentRepository
  ) {}

  public async getComments(postId: string): Promise<CommentEntity[]> {
    return this.blogCommentRepository.findByPostId(postId);
  }

  public async createComment(postId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    console.info(postId, dto);
    throw new NotImplementedException();
  }
}
