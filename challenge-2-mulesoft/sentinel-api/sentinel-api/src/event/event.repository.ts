import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';

@Injectable()
export class EventRepository {
  constructor(private readonly sqlServer: SqlServerService) {}

  // ──── Application-related event GETs ────

  async getApplicationOrganisationInprogress(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Application_Organisation_Inprogress_Get', {
      organisationIds: { type: sql.NVarChar(sql.MAX), value: params.organisationIds ?? null },
      activityTypeIds: { type: sql.NVarChar(sql.MAX), value: params.activityTypeIds ?? null },
    });
  }

  async getApplicationDeviceInprogress(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Application_Device_Inprogress_Get', {
      deviceIds: { type: sql.NVarChar(sql.MAX), value: params.deviceIds ?? null },
      activityTypeIds: { type: sql.NVarChar(sql.MAX), value: params.activityTypeIds ?? null },
    });
  }

  async getOrganisationNamePreviousCurrent(organisationId: number, eventRefNumber: string) {
    return this.sqlServer.callProc('dbo.usp_API_Organisation_Name_Previous_Current_Get', {
      organisationId: { type: sql.Int(), value: organisationId },
      eventRefNumber: { type: sql.VarChar(50), value: eventRefNumber },
    });
  }

  async getFurtherInfoApplicationEvent(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_Further_Info_Application_Event_Get', {
      parentApplicationReferenceNumber: { type: sql.VarChar(100), value: params.parentApplicationReferenceNumber ?? null },
      organisationId: { type: sql.Int(), value: params.organisationId ?? null },
      childApplicationReferenceNumber: { type: sql.VarChar(100), value: params.childApplicationReferenceNumber ?? null },
    });
  }

  async getChildApplicationFurtherInfoCount(eventRefId: string) {
    return this.sqlServer.callProc('dbo.usp_API_DR_CHILD_APPLICATION_FURTHER_INFORMATION_COUNT_Get', {
      eventRefId: { type: sql.VarChar(50), value: eventRefId },
    });
  }

  async getUnregisterApplication(eventRefId: string) {
    return this.sqlServer.callProc('dbo.usp_API_ORGANISATION_UNREGISTER_APPLICATION_Get', {
      eventRefId: { type: sql.VarChar(50), value: eventRefId },
    });
  }

  async getCfsCountryList(eventRefId: string) {
    return this.sqlServer.callProc('dbo.usp_API_CFSApplication_Country_List_Get', {
      eventRefId: { type: sql.VarChar(50), value: eventRefId },
    });
  }

  // ──── Haemo incident search ────

  async searchHaemoIncidents(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_ADVERSE_BLOOD_INCIDENT_SEARCH_GET', {
      organisation_Id: { type: sql.Int(), value: params.organisationId ?? null },
      eventRefNumber: { type: sql.BigInt(), value: params.eventRefNumber ?? null },
      creationDate: { type: sql.DateTime(), value: params.creationDate ?? null },
      reportTypeCode: { type: sql.VarChar(50), value: params.reportTypeCode ?? null },
      incidentReferenceNumber: { type: sql.VarChar(50), value: params.incidentReferenceNumber ?? null },
      localRefNo: { type: sql.VarChar(50), value: params.localRefNo ?? null },
      incidentFromDate: { type: sql.DateTime(), value: params.incidentFromDate ?? null },
      incidentToDate: { type: sql.DateTime(), value: params.incidentToDate ?? null },
      notifiacationSubmittedFromDate: { type: sql.DateTime(), value: params.notificationFromDate ?? null },
      notifiacationSubmittedToDate: { type: sql.DateTime(), value: params.notificationToDate ?? null },
      confirmationSubmittedFromDate: { type: sql.DateTime(), value: params.confirmationFromDate ?? null },
      confirmationSubmittedToDate: { type: sql.DateTime(), value: params.confirmationToDate ?? null },
      issueNumber: { type: sql.Int(), value: params.issueNumber ?? null },
      footNotesSubmittedDate: { type: sql.DateTime(), value: params.footNotesSubmittedDate ?? null },
      region: { type: sql.VarChar(50), value: params.region ?? null },
      folderId: { type: sql.Int(), value: params.folderId ?? null },
      isExcluded: { type: sql.Int(), value: params.isExcluded ?? null },
      isConfirmed: { type: sql.Int(), value: params.isConfirmed ?? null },
      orgName: { type: sql.VarChar(256), value: params.orgName ?? null },
      incidentLocation: { type: sql.VarChar(256), value: params.incidentLocation ?? null },
      eventInvolving: { type: sql.VarChar(256), value: params.eventInvolving ?? null },
      reactionRelatedTo: { type: sql.VarChar(256), value: params.reactionRelatedTo ?? null },
      reporterName: { type: sql.VarChar(256), value: params.reporterName ?? null },
      reporterOrganisationName: { type: sql.VarChar(256), value: params.reporterOrganisationName ?? null },
      mhraStatus: { type: sql.VarChar(50), value: params.mhraStatus ?? null },
      incidentStatus: { type: sql.VarChar(50), value: params.incidentStatus ?? null },
      shotStatus: { type: sql.VarChar(50), value: params.shotStatus ?? null },
      reporterAction: { type: sql.VarChar(50), value: params.reporterAction ?? null },
      categoryCode: { type: sql.VarChar(50), value: params.categoryCode ?? null },
      relatedEstablishmentId: { type: sql.VarChar(50), value: params.relatedEstablishmentId ?? null },
      freeText: { type: sql.NVarChar(sql.MAX), value: params.freeText ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      numberOfRows: { type: sql.Int(), value: params.numberOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
    });
  }

  async searchExceptionalUseIncidents(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_EXCEPTIONAL_USE_INCIDENT_SEARCH_GET', {
      eventRefNumber: { type: sql.VarChar(50), value: params.eventRefNumber ?? null },
      organisationName: { type: sql.VarChar(256), value: params.organisationName ?? null },
      applicationType: { type: sql.VarChar(50), value: params.applicationType ?? null },
      workflowStatusId: { type: sql.Int(), value: params.workflowStatusId ?? null },
      parentEventRefNumber: { type: sql.VarChar(50), value: params.parentEventRefNumber ?? null },
      userType: { type: sql.VarChar(50), value: params.userType ?? null },
      page: { type: sql.Int(), value: params.page ?? null },
      size: { type: sql.Int(), value: params.size ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
      orderBy: { type: sql.VarChar(50), value: params.orderBy ?? null },
      organisationId: { type: sql.VarChar(50), value: params.organisationId ?? null },
    });
  }

  async getExceptionalUseDeviceSearch(eventRefNumber: string, deviceId: number) {
    return this.sqlServer.callProc('dbo.usp_API_EXCEPTIONAL_USE_DEVICE_SEARCH_GET', {
      eventRefNumber: { type: sql.BigInt(), value: eventRefNumber },
      deviceId: { type: sql.Int(), value: deviceId },
    });
  }

  // ──── Application work-in-progress (event context) ────

  async getApplicationWorkInProgress(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ApplicationWorkInProgressItems_Get', {
      organisationName: { type: sql.NVarChar(256), value: params.organisationName ?? null },
      applicationRefNumber: { type: sql.NVarChar(100), value: params.applicationRefNumber ?? null },
      serviceCode: { type: sql.NVarChar(50), value: params.serviceCode ?? null },
      applicationType: { type: sql.NVarChar(50), value: params.applicationType ?? null },
      applicationStatusCode: { type: sql.NVarChar(50), value: params.applicationStatusCode ?? null },
      applicationSubmittedFromDate: { type: sql.DateTime(), value: params.submittedFromDate ?? null },
      applicationSubmittedToDate: { type: sql.DateTime(), value: params.submittedToDate ?? null },
      assignedToUserName: { type: sql.NVarChar(256), value: params.assignedToUserName ?? null },
      paymentStatus: { type: sql.NVarChar(50), value: params.paymentStatus ?? null },
      organisationIds: { type: sql.NVarChar(sql.MAX), value: params.organisationIds ?? null },
      submittedBy: { type: sql.NVarChar(256), value: params.submittedBy ?? null },
      includeCompleted: { type: sql.SmallInt(), value: params.includeCompleted ?? null },
      isDraft: { type: sql.Int(), value: params.isDraft ?? null },
      businessReviewRequired: { type: sql.TinyInt(), value: params.businessReviewRequired ?? null },
      applicationStatusDescription: { type: sql.VarChar(256), value: params.applicationStatusDescription ?? null },
      partyAssociationTypeId: { type: sql.Int(), value: params.partyAssociationTypeId ?? null },
      partyCategoryId: { type: sql.Int(), value: params.partyCategoryId ?? null },
      page: { type: sql.Int(), value: params.page ?? null },
      size: { type: sql.Int(), value: params.size ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
      orderBy: { type: sql.VarChar(50), value: params.orderBy ?? null },
    });
  }

  async getApplicationDetail(eventRefId: string) {
    return this.sqlServer.callProc('dbo.usp_API_Application_Detail_Get', {
      eventRefId: { type: sql.NVarChar(100), value: eventRefId },
    });
  }

  // ──── Haemo case detail GETs ────

  async getHaemoCaseFootnote(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_CASE_FOOTNOTE_GET', {
      eventRefNumber: { type: sql.BigInt(), value: params.eventRefNumber },
      page: { type: sql.Int(), value: params.page ?? null },
      size: { type: sql.Int(), value: params.size ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
      orderBy: { type: sql.VarChar(50), value: params.orderBy ?? null },
      documentTypeCode: { type: sql.VarChar(50), value: params.documentTypeCode ?? null },
    });
  }

  async getHaemoCaseReviewAuditlog(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_CASE_REVIEW_AUDITLOG_GET', {
      eventRefNumber: { type: sql.BigInt(), value: params.eventRefNumber },
      page: { type: sql.Int(), value: params.page ?? null },
      size: { type: sql.Int(), value: params.size ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
      orderBy: { type: sql.VarChar(50), value: params.orderBy ?? null },
    });
  }

  async getHaemoCaseComments(eventRefNumber: string) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_CASE_COMMENTS_GET', {
      eventRefNumber: { type: sql.BigInt(), value: eventRefNumber },
    });
  }

  // ──── PATCH operations ────

  async patchHaemoIncident(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_INCIDENT_Patch', {
      incidentId: { type: sql.BigInt(), value: params.incidentId },
      actionType: { type: sql.VarChar(50), value: params.actionType ?? null },
      mhraStatus: { type: sql.VarChar(50), value: params.mhraStatus ?? null },
      incidentStatus: { type: sql.VarChar(50), value: params.incidentStatus ?? null },
      reporterAction: { type: sql.VarChar(50), value: params.reporterAction ?? null },
      isExcluded: { type: sql.Bit(), value: params.isExcluded ?? null },
      tagCategoryCode: { type: sql.VarChar(50), value: params.tagCategoryCode ?? null },
      updatedBy: { type: sql.VarChar(256), value: params.updatedBy ?? null },
      updatedDate: { type: sql.DateTime(), value: params.updatedDate ?? null },
      notificationReviewer: { type: sql.VarChar(256), value: params.notificationReviewer ?? null },
      confirmationReviewer: { type: sql.VarChar(256), value: params.confirmationReviewer ?? null },
      exclusionReasonCode: { type: sql.VarChar(50), value: params.exclusionReasonCode ?? null },
      exclusionReasonOther: { type: sql.VarChar(256), value: params.exclusionReasonOther ?? null },
      folderId: { type: sql.Int(), value: params.folderId ?? null },
      isFlagged: { type: sql.Bit(), value: params.isFlagged ?? null },
    });
  }

  async patchHumanitarianStatusDecision(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_HUMANITARIAN_INCIDENT_STATUS_DECISION_Patch', {
      eventRefNumber: { type: sql.BigInt(), value: params.eventRefNumber },
      decisionText: { type: sql.VarChar(sql.MAX), value: params.decisionText ?? null },
      currentWorkflowStatusId: { type: sql.Int(), value: params.currentWorkflowStatusId ?? null },
      createdBy: { type: sql.VarChar(256), value: params.createdBy ?? null },
      createdDateTime: { type: sql.DateTime(), value: params.createdDateTime ?? null },
    });
  }

  async transferIncidents(params: any) {
    return this.sqlServer.callProc('dbo.usp_HAEMO_ORGANISATION_INCIDENTS_TRANSFER_PATCH', {
      reportedOrganisationId: { type: sql.Int(), value: params.reportedOrganisationId },
      currentOrganisationId: { type: sql.Int(), value: params.currentOrganisationId },
    });
  }

  // ──── POST operations ────

  async postHumanitarianConsultant(consultantDetails: string) {
    return this.sqlServer.callProc('dbo.usp_API_HUMANITARIAN_CONSULTANT_POST', {
      consultantDetails: { type: sql.VarChar(sql.MAX), value: consultantDetails },
    });
  }

  async postFurtherInfoApplicationEvent(params: any) {
    return this.sqlServer.callProc('dbo.usp_Further_Info_Application_Event_Post', {
      applicationReferenceNumber: { type: sql.VarChar(100), value: params.applicationReferenceNumber },
      organisation_id: { type: sql.Int(), value: params.organisationId },
      organisationDetailFurtherInformationId: { type: sql.Int(), value: params.organisationDetailFurtherInformationId ?? null },
      businessUserComments: { type: sql.NVarChar(sql.MAX), value: params.businessUserComments ?? null },
      businessUserName: { type: sql.VarChar(256), value: params.businessUserName },
      eventVersionId: { type: sql.Int(), value: params.eventVersionId ?? null },
    });
  }

  async postHaemoSeriousIncidentConfirmation(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SERIOUS_INCIDENT_CONFIRMATION_POST', {
      eventConfirmation: { type: sql.VarChar(sql.MAX), value: params.eventConfirmation },
      eventRefNumber: { type: sql.BigInt(), value: params.eventRefNumber },
    });
  }

  async postHaemoFootnoteDocument(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_FOOTNOTE_DOCUMENT_POST', {
      footnote: { type: sql.VarChar(sql.MAX), value: params.footnote },
      eventRefNumber: { type: sql.BigInt(), value: params.eventRefNumber },
    });
  }

  async postCfsOrderApplication(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_CFS_Order_Application_API_Json_Post', {
      Organisation_Id: { type: sql.Int(), value: params.organisationId },
      CFSOrderJson: { type: sql.NVarChar(sql.MAX), value: params.cfsOrderJson },
      EVENT_ID: { type: sql.Int(), value: params.eventId ?? null },
      Event_Version_Id: { type: sql.Int(), value: params.eventVersionId ?? null },
      App_User_Name: { type: sql.NVarChar(256), value: params.appUserName },
    });
  }

  async postHaemoCaseComments(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_CASE_COMMENTS_POST', {
      incidentId: { type: sql.BigInt(), value: params.incidentId },
      comments: { type: sql.VarChar(sql.MAX), value: params.comments },
      commentedBy: { type: sql.VarChar(256), value: params.commentedBy },
      commentedDate: { type: sql.VarChar(50), value: params.commentedDate },
    });
  }

  async postHumanitarianCaseComments(comments: string) {
    return this.sqlServer.callProc('dbo.usp_API_HUMANITARIAN_CASE_COMMENTS_POST', {
      comments: { type: sql.VarChar(sql.MAX), value: comments },
    });
  }

  async postCfsApplicationDocument(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_CFS_Application_Document_Json_Post', {
      applicationReferenceNumber: { type: sql.VarChar(100), value: params.applicationReferenceNumber },
      cfsDocumentJson: { type: sql.NVarChar(sql.MAX), value: params.cfsDocumentJson },
      eventVersionId: { type: sql.Int(), value: params.eventVersionId ?? null },
    });
  }

  async postExceptionalUseAttachDocument(humanitarianDocuments: string) {
    return this.sqlServer.callProc('dbo.usp_API_EXCEPTIONAL_USE_INCIDENT_ATTACH_DOCUMENT_POST', {
      humanitarianDocuments: { type: sql.VarChar(sql.MAX), value: humanitarianDocuments },
    });
  }

  // ──── PUT operations ────

  async putDocumentStorageIdentifier(docJson: string) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Document_StorageIdentifier_Put', {
      DocJson: { type: sql.NVarChar(sql.MAX), value: docJson },
    });
  }

  async putApplicationOrganisationRegistrationStatus(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Application_OrganisationRegistrationStatus_Put', {
      ApplicationReferenceNumber: { type: sql.VarChar(100), value: params.applicationReferenceNumber },
      OrganisationReviewStatusJson: { type: sql.NVarChar(sql.MAX), value: params.organisationReviewStatusJson },
      ReviewUserName: { type: sql.VarChar(256), value: params.reviewUserName },
    });
  }

  async putApplicationDeviceRegistrationStatus(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Application_DeviceRegistrationStatus_Put', {
      ApplicationReferenceNumber: { type: sql.VarChar(100), value: params.applicationReferenceNumber },
      DeviceReviewStatusJson: { type: sql.NVarChar(sql.MAX), value: params.deviceReviewStatusJson },
      ReviewUserName: { type: sql.VarChar(256), value: params.reviewUserName },
      IsProductApplication: { type: sql.TinyInt(), value: params.isProductApplication ?? null },
      AppRejectionReasonId: { type: sql.Int(), value: params.appRejectionReasonId ?? null },
    });
  }

  async putApplicationOrganisationDraft(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Application_Organisation_Draft_Put', {
      ORGANISATION_ID: { type: sql.Int(), value: params.organisationId },
      EVENT_REFERENCE_NUMBER: { type: sql.VarChar(50), value: params.eventReferenceNumber },
      ACCOUNT_APPLICATION_STATUS: { type: sql.SmallInt(), value: params.accountApplicationStatus },
      SERVICE_ID: { type: sql.SmallInt(), value: params.serviceId },
      ACCOUNT_REJECTION_REASON_ID: { type: sql.Int(), value: params.accountRejectionReasonId ?? null },
      REJECTION_COMMENTS: { type: sql.NVarChar(sql.MAX), value: params.rejectionComments ?? null },
      APP_USER_NAME: { type: sql.NVarChar(256), value: params.appUserName },
      AuthRepOrgDocumentReviewJson: { type: sql.NVarChar(sql.MAX), value: params.authRepOrgDocumentReviewJson ?? null },
    });
  }

  async putApplicationAssignment(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Application_ApplicationAssignment_Put', {
      ApplicationReferenceNumber: { type: sql.VarChar(100), value: params.applicationReferenceNumber },
      AssignedToUserName: { type: sql.VarChar(256), value: params.assignedToUserName },
      ApplicationStatusId: { type: sql.Int(), value: params.applicationStatusId ?? null },
    });
  }

  async putCfsOrderApplicationStatus(params: any) {
    return this.sqlServer.callProc('dbo.usp_Application_CFSOrderApplicationStatus_Put', {
      ApplicationReferenceNumber: { type: sql.VarChar(100), value: params.applicationReferenceNumber },
      cfsStatusId: { type: sql.Int(), value: params.cfsStatusId },
      rejectionReasonJSON: { type: sql.VarChar(sql.MAX), value: params.rejectionReasonJSON ?? null },
    });
  }

  async putFurtherInfoApplicationEvent(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Further_Info_Application_Event_Put', {
      parentApplicationRefNo: { type: sql.VarChar(100), value: params.parentApplicationRefNo },
      applicationReferenceNumber: { type: sql.VarChar(100), value: params.applicationReferenceNumber },
      organisationId: { type: sql.Int(), value: params.organisationId },
      documentJson: { type: sql.NVarChar(sql.MAX), value: params.documentJson ?? null },
      customerComments: { type: sql.NVarChar(sql.MAX), value: params.customerComments ?? null },
      eventVersionId: { type: sql.Int(), value: params.eventVersionId ?? null },
      appUserId: { type: sql.Int(), value: params.appUserId ?? null },
    });
  }

  async putDerogationsFinalDecision(decision: string) {
    return this.sqlServer.callProc('dbo.usp_API_DEROGATIONS_FINAL_DECISION_PUT', {
      decision: { type: sql.VarChar(sql.MAX), value: decision },
    });
  }

  async putDerogationsDctCommentsSupportingDocs(comments: string) {
    return this.sqlServer.callProc('dbo.usp_API_DEROGATIONS_DCT_COMMENTS_SUPPORTINGDOCS_PUT', {
      comments: { type: sql.VarChar(sql.MAX), value: comments },
    });
  }

  async putDerogationsCorrespondenceDecisionDocuments(derogationDocuments: string) {
    return this.sqlServer.callProc('dbo.usp_API_DEROGATIONS_CORRESPONDENCE_DECISION_DOCUMENTS_PUT', {
      derogationDocuments: { type: sql.VarChar(sql.MAX), value: derogationDocuments },
    });
  }
}
