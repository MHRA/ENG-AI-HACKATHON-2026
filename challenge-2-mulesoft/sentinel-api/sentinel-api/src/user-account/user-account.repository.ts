import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';

@Injectable()
export class UserAccountRepository {
  constructor(private readonly sqlServer: SqlServerService) {}

  async getUserPermissions(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_USER_PERMISSION_Get', {
      userPermissionId: { type: sql.Int(), value: params.userPermissionId ?? null },
      userId: { type: sql.Int(), value: params.userId ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
    });
  }

  async updatePermissionStatus(userName: string) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_USER_PERMISSION_STATUS_Put', {
      USER_NAME: { type: sql.NVarChar(256), value: userName },
    });
  }

  async getBroadcasts(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_MHRA_System_Broadcast_UserAndMessage_GET', {
      serviceId: { type: sql.Int(), value: params.serviceId ?? null },
      messageStatus: { type: sql.VarChar(50), value: params.messageStatus ?? null },
      userId: { type: sql.Int(), value: params.userId ?? null },
      page: { type: sql.Int(), value: params.page ?? null },
      size: { type: sql.Int(), value: params.size ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
      orderBy: { type: sql.VarChar(50), value: params.orderBy ?? null },
    });
  }

  async createBroadcast(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_MHRA_System_Broadcast_Message_POST', {
      service_Id: { type: sql.Int(), value: params.serviceId },
      messageTitle: { type: sql.VarChar(256), value: params.messageTitle },
      broadcastMessage: { type: sql.VarChar(sql.MAX), value: params.broadcastMessage },
      messageStartDate: { type: sql.DateTime(), value: params.messageStartDate },
      messageEndDate: { type: sql.DateTime(), value: params.messageEndDate },
      createdDate: { type: sql.DateTime(), value: params.createdDate },
      createdBy: { type: sql.VarChar(256), value: params.createdBy },
    });
  }

  async updateBroadcast(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_MHRA_System_Broadcast_Message_PUT', {
      Broadcast_ID: { type: sql.Int(), value: params.broadcastId },
      service_Id: { type: sql.Int(), value: params.serviceId },
      messageTitle: { type: sql.VarChar(256), value: params.messageTitle },
      broadcastMessage: { type: sql.VarChar(sql.MAX), value: params.broadcastMessage },
      messageStartDate: { type: sql.DateTime(), value: params.messageStartDate },
      messageEndDate: { type: sql.DateTime(), value: params.messageEndDate },
      createdDate: { type: sql.DateTime(), value: params.createdDate },
      createdBy: { type: sql.VarChar(256), value: params.createdBy },
    });
  }

  async markBroadcastViewed(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_MHRA_System_Broadcast_Message_User_view_POST', {
      broadcast_Id: { type: sql.Int(), value: params.broadcastId },
      user_Id: { type: sql.Int(), value: params.userId },
      messageViewDate: { type: sql.DateTime(), value: params.messageViewDate },
    });
  }

  async addServicePermission(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Service_Permission_Post', {
      UserId: { type: sql.Int(), value: params.userId },
      organisationId: { type: sql.Int(), value: params.organisationId },
      serviceId: { type: sql.Int(), value: params.serviceId },
      userAccountStatusId: { type: sql.Int(), value: params.userAccountStatusId },
      userPermissionStatusId: { type: sql.Int(), value: params.userPermissionStatusId },
    });
  }
}
