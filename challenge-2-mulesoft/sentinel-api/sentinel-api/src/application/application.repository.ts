import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';

@Injectable()
export class ApplicationRepository {
  constructor(private readonly sqlServer: SqlServerService) {}

  async getWorkInProgressItems(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ApplicationWorkInProgressItems_Get', {
      OrgNameRef: { type: sql.NVarChar(256), value: params.orgNameRef ?? null },
      AppRefNumber: { type: sql.NVarChar(100), value: params.appRefNumber ?? null },
      serviceCode: { type: sql.NVarChar(50), value: params.serviceCode ?? null },
      applicationType: { type: sql.NVarChar(100), value: params.applicationType ?? null },
      applicationStatusCode: { type: sql.NVarChar(50), value: params.applicationStatusCode ?? null },
      applicationSubmittedFromDate: { type: sql.DateTime(), value: params.applicationSubmittedFromDate ?? null },
      applicationSubmittedToDate: { type: sql.DateTime(), value: params.applicationSubmittedToDate ?? null },
      assignedToUserName: { type: sql.NVarChar(256), value: params.assignedToUserName ?? null },
      paymentStatus: { type: sql.NVarChar(50), value: params.paymentStatus ?? null },
      OrganisationIdMultiple: { type: sql.NVarChar(sql.MAX), value: params.organisationIdMultiple ?? null },
      submittedBy: { type: sql.NVarChar(256), value: params.submittedBy ?? null },
      includeCompleted: { type: sql.SmallInt(), value: params.includeCompleted ?? null },
      isDraft: { type: sql.Int(), value: params.isDraft ?? null },
      businessReviewRequired: { type: sql.TinyInt(), value: params.businessReviewRequired ?? null },
      applicationStatusDescription: { type: sql.VarChar(256), value: params.applicationStatusDescription ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      partyAssociationTypeId: { type: sql.Int(), value: params.partyAssociationTypeId ?? null },
      partyCategoryId: { type: sql.Int(), value: params.partyCategoryId ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscendingFlag: { type: sql.Bit(), value: params.isAscendingFlag ?? null },
    });
  }

  async getInProgressApplications(organisationIds: string, activityTypeIds?: string) {
    return this.sqlServer.callProc('dbo.usp_Application_Organisation_Inprogress_Get', {
      organisationIds: { type: sql.NVarChar(sql.MAX), value: organisationIds },
      activityTypeIds: { type: sql.NVarChar(sql.MAX), value: activityTypeIds ?? null },
    });
  }

  async getApplicationDetail(applicationReferenceNumber: string) {
    return this.sqlServer.callProc('dbo.usp_API_Application_Detail_Get', {
      applicationReferenceNumber: { type: sql.NVarChar(100), value: applicationReferenceNumber },
    });
  }

  async getFurtherInfo(parentAppRefNumber: string, organisationId?: number, childAppRefNumber?: string) {
    return this.sqlServer.callProc('dbo.usp_API_Further_Info_Application_Event_Get', {
      parentApplicationReferenceNumber: { type: sql.VarChar(100), value: parentAppRefNumber },
      organisationId: { type: sql.Int(), value: organisationId ?? null },
      childApplicationReferenceNumber: { type: sql.VarChar(100), value: childAppRefNumber ?? null },
    });
  }

  async getRelatedApplicationsCount(eventReferenceNumber: string) {
    return this.sqlServer.callProc('dbo.usp_API_DR_CHILD_APPLICATION_FURTHER_INFORMATION_COUNT_Get', {
      eventReferenceNumber: { type: sql.VarChar(100), value: eventReferenceNumber },
    });
  }

  async getUnregisterApplication(applicationRefNumber: string) {
    return this.sqlServer.callProc('dbo.usp_API_ORGANISATION_UNREGISTER_APPLICATION_Get', {
      applicationRefNumber: { type: sql.VarChar(100), value: applicationRefNumber },
    });
  }

  async getCfsCountries(applicationRefNumber: string, startPos?: number, noOfRows?: number, sortField?: string, isAscendingFlag?: boolean) {
    return this.sqlServer.callProc('dbo.usp_API_CFSApplication_Country_List_Get', {
      ApplicationRefNumber: { type: sql.VarChar(100), value: applicationRefNumber },
      startPos: { type: sql.Int(), value: startPos ?? null },
      noOfRows: { type: sql.Int(), value: noOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: sortField ?? null },
      isAscendingFlag: { type: sql.Bit(), value: isAscendingFlag ?? null },
    });
  }
}
