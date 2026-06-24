import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sql from 'mssql';

@Injectable()
export class SqlServerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SqlServerService.name);
  private pool: sql.ConnectionPool | null = null;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const config: sql.config = {
      server: this.configService.getOrThrow<string>('DB_HOST'),
      database: this.configService.getOrThrow<string>('DB_NAME'),
      user: this.configService.getOrThrow<string>('DB_USER'),
      password: this.configService.getOrThrow<string>('DB_PASSWORD'),
      port: parseInt(this.configService.get<string>('DB_PORT', '1433'), 10),
      options: {
        encrypt: true,
        trustServerCertificate:
          this.configService.get<string>('DB_TRUST_CERT', 'false') === 'true',
      },
      pool: {
        min: 2,
        max: 10,
        idleTimeoutMillis: 30000,
      },
    };

    try {
      this.pool = await new sql.ConnectionPool(config).connect();
      this.logger.log(
        `Connected to SQL Server: ${config.server}/${config.database}`,
      );
    } catch (error) {
      this.logger.warn(
        `Failed to connect to SQL Server (${config.server}/${config.database}) — app will start without DB. Endpoints will return 503 until connection is available.`,
      );
      this.logger.debug(error);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      this.logger.log('SQL Server connection pool closed');
    }
  }

  /**
   * Execute a stored procedure with typed parameters.
   *
   * @param procName - Fully qualified stored procedure name (e.g. "dbo.usp_GetAddress")
   * @param params - Record of parameter name to { type, value } pairs
   * @returns The result set from the stored procedure
   */
  async callProc(
    procName: string,
    params: Record<
      string,
      { type: sql.ISqlType | ((...args: unknown[]) => sql.ISqlType); value: unknown; output?: boolean }
    > = {},
  ): Promise<sql.IProcedureResult<unknown>> {
    if (!this.pool) {
      throw new Error('Database connection pool is not initialized');
    }

    const request = this.pool.request();

    for (const [name, param] of Object.entries(params)) {
      if (param.output) {
        request.output(name, param.type);
      } else {
        request.input(name, param.type, param.value);
      }
    }

    this.logger.debug(`Calling stored procedure: ${procName}`);
    try {
      return await request.execute(procName);
    } catch (error: any) {
      if (error?.number === 8146) {
        this.logger.debug(`Stub proc ${procName} has no params — retrying without args`);
        const retryRequest = this.pool.request();
        return retryRequest.execute(procName);
      }
      throw error;
    }
  }

  /**
   * Health check — runs a trivial query to confirm connectivity.
   */
  async isHealthy(): Promise<boolean> {
    try {
      if (!this.pool) return false;
      await this.pool.request().query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }
}
