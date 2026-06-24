import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { TracingInterceptor } from './interceptors/tracing.interceptor';
import { RequestLoggingInterceptor } from './interceptors/request-logging.interceptor';
import { CommonErrorFilter } from './filters/common-error.filter';

@Global()
@Module({
  providers: [
    ApiKeyGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: TracingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CommonErrorFilter,
    },
  ],
  exports: [ApiKeyGuard],
})
export class CommonModule {}
