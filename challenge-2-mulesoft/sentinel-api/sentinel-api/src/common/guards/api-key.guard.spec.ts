import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let configService: jest.Mocked<ConfigService>;

  const API_KEY = 'valid-api-key-12345';

  beforeEach(async () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue(API_KEY),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyGuard,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
    configService = module.get(ConfigService);
  });

  function createMockExecutionContext(headers: Record<string, string>) {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ headers }),
      }),
    } as any;
  }

  it('should return true when valid key is provided in x-api-key header', () => {
    const context = createMockExecutionContext({
      'x-api-key': API_KEY,
    });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return true when valid key is provided in client_id header', () => {
    const context = createMockExecutionContext({
      client_id: API_KEY,
    });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw UnauthorizedException when no API key header is present', () => {
    const context = createMockExecutionContext({});

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException when wrong key is provided', () => {
    const context = createMockExecutionContext({
      'x-api-key': 'wrong-key',
    });

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException with correct message', () => {
    const context = createMockExecutionContext({});

    expect(() => guard.canActivate(context)).toThrow(
      'Invalid or missing API key',
    );
  });

  it('should prefer x-api-key over client_id when both are present', () => {
    const context = createMockExecutionContext({
      'x-api-key': API_KEY,
      client_id: 'wrong-key',
    });

    expect(guard.canActivate(context)).toBe(true);
  });
});
