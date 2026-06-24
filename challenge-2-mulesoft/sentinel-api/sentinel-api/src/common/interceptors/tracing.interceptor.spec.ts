import { of } from 'rxjs';
import { TracingInterceptor } from './tracing.interceptor';

describe('TracingInterceptor', () => {
  let interceptor: TracingInterceptor;
  let mockRequest: { headers: Record<string, string>; correlationId?: string };
  let mockResponse: { header: jest.Mock };
  let mockCallHandler: { handle: jest.Mock };

  beforeEach(() => {
    interceptor = new TracingInterceptor();
    mockRequest = { headers: {} };
    mockResponse = { header: jest.fn() };
    mockCallHandler = { handle: jest.fn().mockReturnValue(of({})) };
  });

  function createMockContext() {
    return {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
        getResponse: () => mockResponse,
      }),
    } as any;
  }

  it('should use existing x-correlation-id header when present', (done) => {
    mockRequest.headers['x-correlation-id'] = 'existing-id-123';
    const context = createMockContext();

    const result$ = interceptor.intercept(context, mockCallHandler);

    result$.subscribe(() => {
      expect(mockRequest.correlationId).toBe('existing-id-123');
      expect(mockResponse.header).toHaveBeenCalledWith(
        'X-Correlation-Id',
        'existing-id-123',
      );
      done();
    });
  });

  it('should generate a UUID when x-correlation-id header is not present', (done) => {
    const context = createMockContext();

    const result$ = interceptor.intercept(context, mockCallHandler);

    result$.subscribe(() => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      expect(mockRequest.correlationId).toMatch(uuidRegex);
      done();
    });
  });

  it('should set correlationId on the request object', (done) => {
    mockRequest.headers['x-correlation-id'] = 'my-trace-id';
    const context = createMockContext();

    const result$ = interceptor.intercept(context, mockCallHandler);

    result$.subscribe(() => {
      expect(mockRequest.correlationId).toBe('my-trace-id');
      done();
    });
  });

  it('should set X-Correlation-Id response header with generated UUID', (done) => {
    const context = createMockContext();

    const result$ = interceptor.intercept(context, mockCallHandler);

    result$.subscribe(() => {
      expect(mockResponse.header).toHaveBeenCalledWith(
        'X-Correlation-Id',
        expect.stringMatching(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
        ),
      );
      done();
    });
  });

  it('should call next.handle()', (done) => {
    const context = createMockContext();

    const result$ = interceptor.intercept(context, mockCallHandler);

    result$.subscribe(() => {
      expect(mockCallHandler.handle).toHaveBeenCalled();
      done();
    });
  });

  it('should pass through the response from next.handle()', (done) => {
    mockCallHandler.handle.mockReturnValue(of({ data: 'test' }));
    const context = createMockContext();

    const result$ = interceptor.intercept(context, mockCallHandler);

    result$.subscribe((value) => {
      expect(value).toEqual({ data: 'test' });
      done();
    });
  });
});
