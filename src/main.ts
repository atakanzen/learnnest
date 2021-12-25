import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist helps to remove unwanted properties from the resulting DTO.
      whitelist: true,
      // forbidNonWhitelisted stops the request from processing if a property is whitelisted.
      forbidNonWhitelisted: true,
      // transform helps to transform the payloads to the expected DTO format.
      // It can also be set in method-level validation options.
      // It performs implicit primitive type transformation, such as string (path and query parameters) to number.
      // transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
