import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import 'multer';
import { ApplicationServiceURL } from '@project/api-config';
import { HttpService } from '@nestjs/axios';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

type PlainObject = Record<string, unknown>;

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function fillDto<T, V extends PlainObject[]>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
      excludeExtraneousValues: true,
      ...options,
  });
}

export function getMongoConnectionString({username, password, host, port, authDatabase, databaseName}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getRabbitMQConnectionString({user, password, host, port}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit }
}

export const saveFile = async (httpService: HttpService, file: Express.Multer.File) => {
  const formData = new FormData();
  const formFile = (new Blob([file.buffer])).slice(0, file.size, file.mimetype);
  formData.append('file', formFile, file.originalname);
  const { data } = await httpService.axiosRef.post(`${ApplicationServiceURL.FilesStorage}/upload`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );

  return data;
}
