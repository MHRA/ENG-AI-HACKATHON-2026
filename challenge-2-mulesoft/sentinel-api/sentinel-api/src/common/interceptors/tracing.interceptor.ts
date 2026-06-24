import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TracingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const response = http.getResponse();

    const correlationId =
      (request.headers['x-correlation-id'] as string) ||
      crypto.randomUUID();

    // Store on request for downstream use
    request.correlationId = correlationId;

    // Attach to response headers
    response.header('X-Correlation-Id', correlationId);

    return next.handle();
  }
}
