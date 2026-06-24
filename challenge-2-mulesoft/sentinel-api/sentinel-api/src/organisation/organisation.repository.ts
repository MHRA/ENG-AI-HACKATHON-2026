import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';

@Injectable()
export class OrganisationRepository {
  constructor(private readonly sqlServer: SqlServerService) {}

  async searchOrganisations(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ORGANISATION_SEARCH_GET', {
      organisationIds: { type: sql.VarChar(sql.MAX), value: params.organisationIds ?? null },
      organisationName: { type: sql.VarChar(256), value: params.organisationName ?? null },
      serviceIds: { type: sql.VarChar(256), value: params.serviceIds ?? null },
      registrationStatusIds: { type: sql.VarChar(256), value: params.registrationStatusIds ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
    });
  }

  async getOrganisationDetail(organisationId: number) {
    return this.sqlServer.callProc('dbo.usp_API_Organisation_Detail_Get', {
      ORGID: { type: sql.Int(), value: organisationId },
    });
  }

  async getParentAssociation(organisationId: number) {
    return this.sqlServer.callProc('dbo.usp_API_Parent_AssociationType_By_Child_Get', {
      ORGID: { type: sql.Int(), value: organisationId },
    });
  }

  async getPartyNotes(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_PARTY_NOTES_Get', {
      orgId: { type: sql.Int(), value: params.orgId ?? null },
      noteId: { type: sql.Int(), value: params.noteId ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
    });
  }

  async createPartyNote(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_PARTY_NOTES_Post', {
      organisationId: { type: sql.Int(), value: params.organisationId },
      noteTitle: { type: sql.NVarChar(256), value: params.noteTitle },
      noteDescription: { type: sql.NVarChar(sql.MAX), value: params.noteDescription },
      documentJson: { type: sql.NVarChar(sql.MAX), value: params.documentJson ?? null },
      recordedBy: { type: sql.NVarChar(256), value: params.recordedBy },
      recordedDate: { type: sql.Date(), value: params.recordedDate ?? null },
    });
  }

  async getMigrationGracePeriod(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Organisation_Migration_Grace_Period_Get', {
      organisationId: { type: sql.NVarChar(50), value: params.organisationId ?? null },
      fromDate: { type: sql.Date(), value: params.fromDate ?? null },
      toDate: { type: sql.Date(), value: params.toDate ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
      parentOrgId: { type: sql.Int(), value: params.parentOrgId ?? null },
    });
  }

  async registerOrganisation(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Organisation_Registration_API_Json_Post_Generic', {
      organisationJson: { type: sql.NVarChar(sql.MAX), value: params.organisationJson },
      activityTypeId: { type: sql.SmallInt(), value: params.activityTypeId ?? null },
      eventVersionId: { type: sql.Int(), value: params.eventVersionId ?? null },
      serviceId: { type: sql.SmallInt(), value: params.serviceId ?? null },
      userName: { type: sql.VarChar(256), value: params.userName },
      appUserName: { type: sql.VarChar(256), value: params.appUserName ?? null },
      partyAssociationTypeId: { type: sql.Int(), value: params.partyAssociationTypeId ?? null },
    });
  }

  async updateOrganisationRegistration(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Organisation_Registration_API_Json_Put_Generic', {
      organisationId: { type: sql.Int(), value: params.organisationId },
      organisationJson: { type: sql.NVarChar(sql.MAX), value: params.organisationJson },
      activityTypeId: { type: sql.SmallInt(), value: params.activityTypeId ?? null },
      serviceId: { type: sql.SmallInt(), value: params.serviceId ?? null },
      appUserId: { type: sql.Int(), value: params.appUserId ?? null },
      authRepOrgDocumentsJson: { type: sql.NVarChar(sql.MAX), value: params.authRepOrgDocumentsJson ?? null },
    });
  }

  async updatePardOptions(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_PARD_OPTIONS_Put', {
      pardOptionsId: { type: sql.Int(), value: params.pardOptionsId },
      partyId: { type: sql.Int(), value: params.partyId },
      isPublishManufacturerName: { type: sql.TinyInt(), value: params.isPublishManufacturerName ?? null },
      isPublisAuthorisedRepName: { type: sql.TinyInt(), value: params.isPublisAuthorisedRepName ?? null },
      isPublishManufacturerAddress: { type: sql.TinyInt(), value: params.isPublishManufacturerAddress ?? null },
      isPublishAuthrisedRepAddress: { type: sql.TinyInt(), value: params.isPublishAuthrisedRepAddress ?? null },
    });
  }

  async confirmMigrationAddress(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Migration_UserOrganisation_Address_Confirmation_Flag_Put', {
      organisationId: { type: sql.Int(), value: params.organisationId },
      addressConfirmed: { type: sql.SmallInt(), value: params.addressConfirmed },
      addrId: { type: sql.Int(), value: params.addrId ?? null },
      addrLineOne: { type: sql.NVarChar(256), value: params.addrLineOne ?? null },
      addrLineTwo: { type: sql.NVarChar(256), value: params.addrLineTwo ?? null },
      addrLineThree: { type: sql.NVarChar(256), value: params.addrLineThree ?? null },
      addrLineFour: { type: sql.NVarChar(256), value: params.addrLineFour ?? null },
      countyStateProvince: { type: sql.NVarChar(256), value: params.countyStateProvince ?? null },
      postCode: { type: sql.NVarChar(20), value: params.postCode ?? null },
      appUserId: { type: sql.Int(), value: params.appUserId ?? null },
    });
  }

  async approveRegistration(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_ORGANISATION_REGISTRATION_APPROVAL_Post', {
      organisationId: { type: sql.Int(), value: params.organisationId },
      eventReferenceNumber: { type: sql.VarChar(50), value: params.eventReferenceNumber },
      accountApplicationStatus: { type: sql.SmallInt(), value: params.accountApplicationStatus },
      serviceId: { type: sql.SmallInt(), value: params.serviceId },
      accountRejectionReasonId: { type: sql.Int(), value: params.accountRejectionReasonId ?? null },
      rejectionComments: { type: sql.NVarChar(sql.MAX), value: params.rejectionComments ?? null },
      userName: { type: sql.NVarChar(256), value: params.userName },
    });
  }

  async unregisterByAdmin(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_ORGANISATION_UNREGISTRATION_BY_ADMIN_Put', {
      userName: { type: sql.NVarChar(256), value: params.userName },
      applicationDate: { type: sql.Date(), value: params.applicationDate ?? null },
      applicationRefNumber: { type: sql.VarChar(50), value: params.applicationRefNumber ?? null },
      appStatus: { type: sql.VarChar(50), value: params.appStatus ?? null },
      rejectionComment: { type: sql.NVarChar(sql.MAX), value: params.rejectionComment ?? null },
      organisationId: { type: sql.Int(), value: params.organisationId },
      requester: { type: sql.VarChar(256), value: params.requester ?? null },
      reasonCode: { type: sql.VarChar(50), value: params.reasonCode ?? null },
      docTypeCode: { type: sql.VarChar(50), value: params.docTypeCode ?? null },
      docDesc: { type: sql.NVarChar(256), value: params.docDesc ?? null },
      docUploadTime: { type: sql.Date(), value: params.docUploadTime ?? null },
      documentLocId: { type: sql.Int(), value: params.documentLocId ?? null },
      docLocationType: { type: sql.VarChar(50), value: params.docLocationType ?? null },
      docLocation: { type: sql.NVarChar(sql.MAX), value: params.docLocation ?? null },
      md5Hash: { type: sql.NVarChar(256), value: params.md5Hash ?? null },
      partyUnregisterAppRejectionReason: { type: sql.SmallInt(), value: params.partyUnregisterAppRejectionReason ?? null },
    });
  }

  async unregisterOrganisation(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_ORGANISATION_UNREGISTRATION_POST', {
      userName: { type: sql.NVarChar(256), value: params.userName },
      applicationDate: { type: sql.Date(), value: params.applicationDate ?? null },
      organisationId: { type: sql.Int(), value: params.organisationId },
      requester: { type: sql.VarChar(256), value: params.requester ?? null },
      reasonCode: { type: sql.VarChar(50), value: params.reasonCode ?? null },
      docTypeCode: { type: sql.VarChar(50), value: params.docTypeCode ?? null },
      docDesc: { type: sql.NVarChar(256), value: params.docDesc ?? null },
      docUploadTime: { type: sql.Date(), value: params.docUploadTime ?? null },
      documentLocId: { type: sql.Int(), value: params.documentLocId ?? null },
      docLocationType: { type: sql.VarChar(50), value: params.docLocationType ?? null },
      docLocation: { type: sql.NVarChar(sql.MAX), value: params.docLocation ?? null },
      md5Hash: { type: sql.NVarChar(256), value: params.md5Hash ?? null },
      eventid: { type: sql.Int(), value: params.eventid ?? null },
    });
  }

  async createAccount(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_CREATE_ACCOUNT_Post_Generic', {
      organisationJson: { type: sql.NVarChar(sql.MAX), value: params.organisationJson },
      serviceCode: { type: sql.VarChar(50), value: params.serviceCode },
      userName: { type: sql.VarChar(256), value: params.userName },
      reviewedUserName: { type: sql.VarChar(256), value: params.reviewedUserName ?? null },
    });
  }

  async addServicePermission(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Organisation_Service_Permission_Post', {
      organisationId: { type: sql.Int(), value: params.organisationId },
      serviceId: { type: sql.Int(), value: params.serviceId },
      organisationRegistrationStatusId: { type: sql.Int(), value: params.organisationRegistrationStatusId },
      comments: { type: sql.VarChar(sql.MAX), value: params.comments ?? null },
    });
  }

  async sendGracePeriodNotification(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Migration_GracePeriod_Notification_Post', {
      organisationIdList: { type: sql.VarChar(sql.MAX), value: params.organisationIdList },
      notificationSentDate: { type: sql.Date(), value: params.notificationSentDate },
    });
  }

  async createCompliance(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Organisation_Compliance_Post', {
      organisationId: { type: sql.Int(), value: params.organisationId },
      isCompliance: { type: sql.TinyInt(), value: params.isCompliance },
      complianceDesc: { type: sql.VarChar(sql.MAX), value: params.complianceDesc ?? null },
      createdBy: { type: sql.VarChar(256), value: params.createdBy },
      isActive: { type: sql.TinyInt(), value: params.isActive ?? 1 },
    });
  }

  async getCompliance(organisationId: string) {
    return this.sqlServer.callProc('dbo.usp_API_Organisation_Compliance_Get', {
      organisationId: { type: sql.VarChar(50), value: organisationId },
    });
  }

  async updateCompliance(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Organisation_Compliance_Put', {
      organisationId: { type: sql.Int(), value: params.organisationId },
      isCompliance: { type: sql.TinyInt(), value: params.isCompliance },
      complianceDesc: { type: sql.VarChar(sql.MAX), value: params.complianceDesc ?? null },
      updatedBy: { type: sql.VarChar(256), value: params.updatedBy },
      isActive: { type: sql.TinyInt(), value: params.isActive ?? 1 },
    });
  }
}
