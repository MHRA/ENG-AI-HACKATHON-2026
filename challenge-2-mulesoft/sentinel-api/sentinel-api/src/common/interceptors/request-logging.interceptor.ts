import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const correlationId: string | undefined = request.correlationId;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode: number = response.statusCode;
        const duration = Date.now() - startTime;

        this.logger.log(
          JSON.stringify({
            method,
            path: url,
            statusCode,
            duration,
            correlationId,
          }),
        );
      }),
    );
  }
}
