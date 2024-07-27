import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { EnvValidationMessage } from './mongo.messages';
import { MongoPort } from './mongo.const';

export class MongoConfiguration {
  @IsString({ message: EnvValidationMessage.DBNameRequired })
  public name: string;

  @IsString({ message: EnvValidationMessage.DBHostRequired })
  public host: string;

  @IsNumber({}, { message: EnvValidationMessage.DBPortRequired })
  @Min(MongoPort.MinPort)
  @Max(MongoPort.MaxPort)
  @IsOptional()
  public port: number = MongoPort.DefaultMongoPort;

  @IsString({ message: EnvValidationMessage.DBUserRequired })
  public user: string;

  @IsString({ message: EnvValidationMessage.DBPasswordRequired })
  public password: string;

  @IsString({ message: EnvValidationMessage.DBBaseAuthRequired })
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
