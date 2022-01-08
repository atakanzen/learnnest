import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Intercepting before calling Handler.');

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log(
          `Intercepting after calling handler.\nTime passed since the last interception: ${
            Date.now() - now
          }ms`,
        );
      }),
    );
  }
}
