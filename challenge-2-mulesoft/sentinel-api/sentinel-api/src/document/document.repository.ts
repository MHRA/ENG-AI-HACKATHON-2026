import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';

@Injectable()
export class DocumentRepository {
  constructor(private readonly sqlServer: SqlServerService) {}

  async getOrganisationDocuments(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Organisation_Documents_Get', {
      organisationId: { type: sql.Int(), value: params.organisationId ?? null },
      documentTypeId: { type: sql.Int(), value: params.documentTypeId ?? null },
      documentSubTypeId: { type: sql.Int(), value: params.documentSubTypeId ?? null },
      isRejected: { type: sql.Bit(), value: params.isRejected ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
    });
  }

  async getCommunicationDocuments(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Party_Event_Communication_Document_Get', {
      applicationReferenceNumber: { type: sql.VarChar(100), value: params.applicationReferenceNumber ?? null },
      partyEventCommunicationId: { type: sql.Int(), value: params.partyEventCommunicationId ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
    });
  }

  async getDeviceProductDocuments(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Device_Product_Documents_Get', {
      deviceId: { type: sql.Int(), value: params.deviceId ?? null },
      productId: { type: sql.Int(), value: params.productId ?? null },
      documentTypeId: { type: sql.Int(), value: params.documentTypeId ?? null },
      expiryRequired: { type: sql.TinyInt(), value: params.expiryRequired ?? null },
      applicationReferenceNumber: { type: sql.VarChar(100), value: params.applicationReferenceNumber ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
    });
  }

  async getCfsApplicationDocuments(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_CFSApplication_Document_Get', {
      documentTypeId: { type: sql.VarChar(50), value: params.documentTypeId ?? null },
      applicationReferenceNumber: { type: sql.VarChar(100), value: params.applicationReferenceNumber ?? null },
      isEditable: { type: sql.TinyInt(), value: params.isEditable ?? null },
    });
  }

  async getOrganisationDeviceDocuments(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Organisation_DeviceDocuments_Get', {
      documentTypeId: { type: sql.Int(), value: params.documentTypeId ?? null },
      organisationId: { type: sql.Int(), value: params.organisationId ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
    });
  }

  async getRepresentativeDocuments(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Representative_Organisation_Document_Get', {
      applicationReferenceNumber: { type: sql.VarChar(100), value: params.applicationReferenceNumber ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
    });
  }

  async getDocumentDetail(documentId: number) {
    return this.sqlServer.callProc('dbo.usp_API_Document_Get', {
      documentId: { type: sql.Int(), value: documentId },
    });
  }
}
