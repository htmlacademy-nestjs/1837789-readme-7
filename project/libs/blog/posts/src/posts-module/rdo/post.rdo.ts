import { ApiProperty } from '@nestjs/swagger';
import { CommentRdo } from '@project/comments';
import { Comment, PostType, PostStatus } from '@project/core';
import { Expose, Type } from 'class-transformer';

export class PostRdo {
  @ApiProperty({
    description: 'The uniq post ID',
    example: 'ccaf61d0-0530-4cfc-98fa-4712838d9d96'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'If the post is a repost, then this id points to the original post',
    example: 'ccaf61d0-0530-4cfc-98fa-4712838d9d96'
  })
  @Expose()
  public originalId: string;

  @ApiProperty({
    description: 'Post types enum',
    enum: PostType,
    example: PostType.Text
  })
  @Expose()
  public type: PostType

  @ApiProperty({
    description: 'Post statuses enum',
    enum: PostStatus,
    example: PostStatus.Published
  })
  @Expose()
  public status: PostStatus;

  @ApiProperty({
    description: 'Post author ID',
    example: '661022d3615ce5c3c722054f'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'If the post is a repost, then this id points to the original post author',
    example: '661022d3615ce5c3c722054f'
  })
  @Expose()
  public originalUserId: string;

  @ApiProperty({
    description: 'Post title',
    example: 'A great time of victory!'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Post create date',
    example: '1981-03-12',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Repost sign',
    example: true,
  })
  @Expose()
  public isRepost: string;

  @ApiProperty({
    description: 'Post tags list',
    isArray: true,
    example: ['#aaa', '#bbb']
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Uniq list of user IDs who liked this post',
    isArray: true,
    example: ['661022d3615ce5c3c722054f', '66229f5a637123ebbe48b99b']
  })
  @Expose()
  public likes: string[];

  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: 'List of user comments to this post',
    isArray: true,
    example: [{
      "postId": "21569a85-6b0e-4f5d-9528-a673f29c0b16",
      "message": "We need to get above this problem by taking it to the next level.",
      "userId": "66215457a46f67b7a80f4e99",
      "createdAt": "2023-01-14T13:55:21.865Z"
    },
    {
      "postId": "21569a85-6b0e-4f5d-9528-a673f29c0b16",
      "message": "We need to get above this problem by taking it to the next level.",
      "userId": "66215457a46f67b7a80f4e77",
      "createdAt": "2023-10-22T02:36:06.391Z"
    }]
  })
  @Expose()
  @Type(() => CommentRdo)
  public comments: Comment[];

  @ApiProperty({
    description: 'Post name',
    example: 'Dream house'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Video url',
    example: 'https://www.youtube.com/watch?v=0uqhAoMkFUc'
  })
  @Expose()
  public urlVideo: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'This is an amazing place!'
  })
  @Expose()
  public annoncement: string;

  @ApiProperty({
    description: 'Post text',
    example: 'This is an amazing place!'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Quotation text',
    example: 'You cannot solve a problem at the same level at which it originated.'
  })
  @Expose()
  public textQuotation: string;

  @ApiProperty({
    description: 'The quotation author',
    example: 'Albert Einstein',
  })
  @Expose()
  public authorQuotation: string;

  @ApiProperty({
    description: 'Photo ID for a photo post',
    example: '661022d3615ce5c3c722054f'
  })
  @Expose()
  public photo: string;

  @ApiProperty({
    description: 'Link url',
    example: 'https://15.design.htmlacademy.pro/static/avatar/4.jpg'
  })
  @Expose()
  public urlLink: string;

  @ApiProperty({
    description: 'Link description',
    example: 'This is an amazing place!'
  })
  @Expose()
  public description: string;
}
