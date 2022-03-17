import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('***');
    console.log(`Start request in ${context.getClass().name}`);

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log(`Request ended in ${Date.now() - start}ms`);
        console.log('***');
      }),
    );
  }
}
