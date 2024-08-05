import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import FileStorageConfig from './file-storage.config';

const ENV_FILE_PATH = 'apps/file-vault/file-vault.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [FileStorageConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class FileStorageConfigModule {}
