import { HttpException } from '@nestjs/common';
import { CommonErrorFilter } from './common-error.filter';

describe('CommonErrorFilter', () => {
  let filter: CommonErrorFilter;
  let mockResponse: { status: jest.Mock; send: jest.Mock };
  let mockRequest: { correlationId?: string };

  beforeEach(() => {
    filter = new CommonErrorFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mockRequest = {
      correlationId: 'test-correlation-id',
    };
  });

  function createMockHost() {
    return {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
        getResponse: () => mockResponse,
      }),
    } as any;
  }

  it('should handle HttpException with correct status and message', () => {
    const exception = new HttpException('Forbidden', 403);
    const host = createMockHost();

    filter.catch(exception, host);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          statusCode: 403,
          message: 'Forbidden',
        }),
      }),
    );
  });

  it('should not leak internal error messages for generic errors', () => {
    const exception = new Error('oops');
    const host = createMockHost();

    filter.catch(exception, host);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          statusCode: 500,
          message: 'Internal server error',
        }),
      }),
    );

    const sentBody = mockResponse.send.mock.calls[0][0];
    expect(sentBody.error.message).not.toContain('oops');
  });

  it('should include correlationId in the error response', () => {
    const exception = new Error('something');
    const host = createMockHost();

    filter.catch(exception, host);

    const sentBody = mockResponse.send.mock.calls[0][0];
    expect(sentBody.error.correlationId).toBe('test-correlation-id');
  });

  it('should include timestamp in ISO format', () => {
    const exception = new Error('something');
    const host = createMockHost();

    filter.catch(exception, host);

    const sentBody = mockResponse.send.mock.calls[0][0];
    expect(sentBody.error.timestamp).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    );
  });

  it('should have the standard error response shape', () => {
    const exception = new HttpException('Not Found', 404);
    const host = createMockHost();

    filter.catch(exception, host);

    const sentBody = mockResponse.send.mock.calls[0][0];
    expect(sentBody).toHaveProperty('error.statusCode');
    expect(sentBody).toHaveProperty('error.message');
    expect(sentBody).toHaveProperty('error.correlationId');
    expect(sentBody).toHaveProperty('error.timestamp');
  });

  it('should use "unknown" when request has no correlationId', () => {
    mockRequest = {};
    const exception = new Error('something');
    const host = createMockHost();

    filter.catch(exception, host);

    const sentBody = mockResponse.send.mock.calls[0][0];
    expect(sentBody.error.correlationId).toBe('unknown');
  });

  it('should handle HttpException with object response containing message', () => {
    const exception = new HttpException(
      { message: 'Validation failed', errors: ['field required'] },
      422,
    );
    const host = createMockHost();

    filter.catch(exception, host);

    expect(mockResponse.status).toHaveBeenCalledWith(422);
    const sentBody = mockResponse.send.mock.calls[0][0];
    expect(sentBody.error.message).toBe('Validation failed');
  });
});
