import { Expose, Type } from "class-transformer";
import { PostRdo } from "./post.rdo";
import { ApiProperty } from "@nestjs/swagger";

export class PostWithPaginationRdo {
  @ApiProperty({
    description: 'List of found posts',
    example: [{
      "id": "7c3328fc-0472-4b70-8029-2e46b725a4d8",
      "type": "Video",
      "userId": "661022d3615ce5c3c722054f",
      "title": "Test",
      "createdAt": "2024-04-19T11:29:11.202Z",
      "updatedAt": "2024-04-19T11:29:11.202Z",
      "isRepost": "true",
      "tags": [
        "test_tag"
      ],
      "likes": [],
      "comments": [
        {
          "id": "44149d99-a160-4b81-83b6-49fe0671b6fb",
          "postId": "7c3328fc-0472-4b70-8029-2e46b725a4d8",
          "message": "Test comment text",
          "userId": "661022d3615ce5c3c722054f",
          "createdAt": "2024-04-19T16:45:44.741Z"
        }
      ]
    }]
  })
  @Expose()
  @Type(() => PostRdo)
  public entities: PostRdo[];

  @ApiProperty({
    description: 'Number of pages for pagination',
    example: 5
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Total number of records found',
    example: 45
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Current active page',
    example: 2
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Maximum number of records per page',
    example: 10
  })
  @Expose()
  public itemsPerPage: number;
}
