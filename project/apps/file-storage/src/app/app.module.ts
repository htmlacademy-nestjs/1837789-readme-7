import { Module } from '@nestjs/common';
import { FileUploaderModule } from '@project/file-uploader';
import { FileStorageConfigModule } from '@project/file-storage-config';

@Module({
  imports: [
    FileUploaderModule,
    FileStorageConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
