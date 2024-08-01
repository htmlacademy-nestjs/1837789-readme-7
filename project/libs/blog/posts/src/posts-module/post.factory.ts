import { Injectable } from "@nestjs/common";
import { CommonPost, EntityFactory } from "@project/core";
import { PostEntity } from "./post.entity";

@Injectable()
export class PostFactory implements EntityFactory<PostEntity> {
  public create(entityPlainData: CommonPost): PostEntity {
    return new PostEntity(entityPlainData);
  }
}
