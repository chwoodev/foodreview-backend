import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { clc } from '@nestjs/common/utils/cli-colors.util';
import bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(requestLogMiddlware);
  await app.listen(8000);
}
bootstrap();


const nestLogger = new Logger('HTTP');

export function requestLogMiddlware(request: Request, response: Response, next: NextFunction): void {
  const start = Date.now();
  const { method, originalUrl } = request;
  response.on('finish', () => {
    const { statusCode } = response;
    const timeString = clc.yellow(`${Date.now() - start}ms`);
    nestLogger.log(`${method} ${originalUrl} ${statusCode} ${timeString}`);
  });
  next();
}
