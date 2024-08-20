import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { saveFile } from "@project/helpers";
import { PostType } from '@prisma/client';
import { CreatePostDto } from '@project/posts';

@Injectable()
export class BlogService {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  public async savePostFile(dto: CreatePostDto, photo?: Express.Multer.File) {
    const photoId = photo ? (await saveFile(this.httpService, photo)).id : undefined;
    return dto.type === PostType.Photo ? { ...dto, photoId } : dto;
  }
}
