import { registerAs } from '@nestjs/config';
import Joi from 'joi';

const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export enum Default {
  Port = 3000,
  MongoPort = 27017
}

type Environment = typeof ENVIRONMENTS[number];

export interface FileStorageConfig {
  environment: string;
  port: number;
  uploadDirectory: string;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(Default.Port),
  uploadDirectory: Joi.string().required(),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  })
});

function validateConfig(config: FileStorageConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[FileStorage Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): FileStorageConfig {
  const config: FileStorageConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${Default.Port}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT ?? Default.MongoPort.toString(), 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    }
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
