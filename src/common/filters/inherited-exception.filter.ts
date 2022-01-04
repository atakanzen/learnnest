import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

/**
 * @description
 * Method-scoped and Controller-scoped filters that extend the
 * BaseExceptionFilter should not be instantiated with new. Instead, let the
 * framework instantiate them automatically.
 */
@Catch()
export class CustomAllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    super.catch(exception, host);
  }
}
