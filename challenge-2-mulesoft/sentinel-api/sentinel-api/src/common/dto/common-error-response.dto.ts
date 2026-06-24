import { ApiProperty } from '@nestjs/swagger';

export class ErrorDetail {
  @ApiProperty({ example: 500, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({
    example: 'Internal server error',
    description: 'Human-readable error message',
  })
  message: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Correlation ID for request tracing',
  })
  correlationId: string;

  @ApiProperty({
    example: '2026-06-18T12:00:00.000Z',
    description: 'Timestamp of the error in ISO 8601 format',
  })
  timestamp: string;
}

export class CommonErrorResponseDto {
  @ApiProperty({ type: ErrorDetail, description: 'Error details' })
  error: ErrorDetail;
}
