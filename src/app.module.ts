import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CatsModule } from './modules/cats/cats.module';
import { CatsController } from './modules/cats/controllers/cats.controller';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { HelloModule } from './modules/hello/hello.module';

@Module({
  imports: [CatsModule, HelloModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.GET }, 'cats/(\\d)')
      .forRoutes(CatsController);
  }
}
