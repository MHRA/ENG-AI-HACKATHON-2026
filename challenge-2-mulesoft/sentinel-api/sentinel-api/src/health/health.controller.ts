import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SqlServerService } from '../database/sql-server.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly sqlServerService: SqlServerService) {}

  @Get()
  @ApiOperation({ summary: 'Application health check' })
  async check() {
    const dbHealthy = await this.sqlServerService.isHealthy();

    return {
      status: dbHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      checks: {
        database: dbHealthy ? 'up' : 'down',
      },
    };
  }
}
