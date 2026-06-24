import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class CommonErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(CommonErrorFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const correlationId: string = request.correlationId ?? 'unknown';

    let statusCode = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as { message?: string }).message ?? message;
    } else {
      // Log the real error internally but don't leak to client
      this.logger.error(
        `Unhandled exception [${correlationId}]`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const errorBody = {
      error: {
        statusCode,
        message,
        correlationId,
        timestamp: new Date().toISOString(),
      },
    };

    response.status(statusCode).send(errorBody);
  }
}
