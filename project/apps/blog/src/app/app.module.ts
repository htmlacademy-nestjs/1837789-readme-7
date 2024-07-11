import { Module } from '@nestjs/common';

import { CommentsModule } from '@project/comments';
import { PostsModule } from '@project/posts';

@Module({
  imports: [
    CommentsModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
