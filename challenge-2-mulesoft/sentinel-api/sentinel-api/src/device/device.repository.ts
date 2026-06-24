import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';

@Injectable()
export class DeviceRepository {
  constructor(private readonly sqlServer: SqlServerService) {}

  async addDevice(organisationId: number, deviceJson: string, serviceId: number, appUserName: string) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Device_AddDevice_API_Json_Post_Generic', {
      organisationId: { type: sql.Int(), value: organisationId },
      deviceJson: { type: sql.NVarChar(sql.MAX), value: deviceJson },
      serviceId: { type: sql.SmallInt(), value: serviceId },
      appUserName: { type: sql.VarChar(100), value: appUserName },
    });
  }

  async registerDevice(params: { organisationId: number; serviceId: number; deviceJson: string; appUserName: string; eventId?: number; eventVersion?: number; activityTypeId?: number }) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Device_Registration_API_Json_Post_Generic', {
      organisationId: { type: sql.Int(), value: params.organisationId },
      serviceId: { type: sql.SmallInt(), value: params.serviceId },
      deviceJson: { type: sql.NVarChar(sql.MAX), value: params.deviceJson },
      appUserName: { type: sql.VarChar(100), value: params.appUserName },
      eventId: { type: sql.Int(), value: params.eventId ?? null },
      eventVersion: { type: sql.Int(), value: params.eventVersion ?? null },
      activityTypeId: { type: sql.SmallInt(), value: params.activityTypeId ?? null },
    });
  }

  async updateProductRegistration(params: { organisationId: number; serviceId: number; deviceJson: string; appUserName: string; activityTypeId?: number }) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Device_Product_Registration_Json_Put', {
      organisationId: { type: sql.Int(), value: params.organisationId },
      serviceId: { type: sql.SmallInt(), value: params.serviceId },
      deviceJson: { type: sql.NVarChar(sql.MAX), value: params.deviceJson },
      appUserName: { type: sql.VarChar(100), value: params.appUserName },
      activityTypeId: { type: sql.Int(), value: params.activityTypeId ?? null },
    });
  }

  async updateFurtherInfoRegistration(params: { organisationId: number; serviceId: number; deviceJson: string; appUserName: string; eventId?: number; eventVersion?: number; eventRefNumber?: string }) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Further_Info_Device_Registration_Json_Put', {
      organisationId: { type: sql.Int(), value: params.organisationId },
      serviceId: { type: sql.SmallInt(), value: params.serviceId },
      deviceJson: { type: sql.NVarChar(sql.MAX), value: params.deviceJson },
      appUserName: { type: sql.VarChar(100), value: params.appUserName },
      eventId: { type: sql.Int(), value: params.eventId ?? null },
      eventVersion: { type: sql.Int(), value: params.eventVersion ?? null },
      eventRefNumber: { type: sql.VarChar(100), value: params.eventRefNumber ?? null },
    });
  }

  async getCeCertificateExpiry(deviceIds: string) {
    return this.sqlServer.callProc('dbo.usp_API_Device_CE_Certificate_ExpiryDate_Get', {
      deviceIds: { type: sql.VarChar(sql.MAX), value: deviceIds },
    });
  }
}
