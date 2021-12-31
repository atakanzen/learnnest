import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { logger } from './common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist helps to remove unwanted properties from the resulting DTO.
      whitelist: true,
      // forbidNonWhitelisted stops the request from processing and returns an error if a property is not in whitelist.
      forbidNonWhitelisted: true,
      // transform helps to transform the payloads to the expected DTO format.
      // It can also be set in method-level validation options.
      // It performs implicit primitive type transformation, such as string (path and query parameters) to number.
      transform: true,
    }),
  );

  // Global functional middleware.
  app.use(logger);

  await app.listen(3000);
}
bootstrap();
