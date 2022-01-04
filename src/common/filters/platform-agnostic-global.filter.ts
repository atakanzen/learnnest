import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * @function Catch()
 *
 * @description
 * Here without any parameters, `Catch()` will apply for every unhandled
 * exception.
 *
 *
 */

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  /**
   * Injecting httpAdapter to be platform agnostic. Without using any
   * platform-specific objects such as `Request` and `Response` from `express`.
   * */
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    /**
     * In certain situations `httpAdapter` might not be available in the
     * constructor method, thus we should resolve it here.
     * */
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const body = {
      status: status,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), body, status);
  }
}
