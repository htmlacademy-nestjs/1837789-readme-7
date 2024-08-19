import { Logger, ValidationPipe  } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';
  const DEFAULT_PORT = 3002;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
