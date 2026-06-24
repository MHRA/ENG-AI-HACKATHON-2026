import { Injectable, Logger } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';

@Injectable()
export class ProductRepository {
  private readonly logger = new Logger(ProductRepository.name);

  constructor(private readonly sqlServer: SqlServerService) {}

  /**
   * Get a list of device products.
   * Calls: dbo.usp_API_DeviceProduct_List_Get
   */
  async getProducts(params: {
    organisationId?: number;
    deviceId?: number;
    startPos?: number;
    noOfRows?: number;
    sortField?: string;
    isAscending?: boolean;
  }) {
    return this.sqlServer.callProc('dbo.usp_API_DeviceProduct_List_Get', {
      organisationId: { type: sql.Int(), value: params.organisationId ?? null },
      deviceId: { type: sql.Int(), value: params.deviceId ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      sortField: { type: sql.VarChar(100), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
    });
  }

  /**
   * Get a single product detail by ID.
   * Calls: dbo.usp_API_DeviceProduct_Detail_Get
   */
  async getProductById(productId: number) {
    return this.sqlServer.callProc('dbo.usp_API_DeviceProduct_Detail_Get', {
      productId: { type: sql.Int(), value: productId },
    });
  }
}
