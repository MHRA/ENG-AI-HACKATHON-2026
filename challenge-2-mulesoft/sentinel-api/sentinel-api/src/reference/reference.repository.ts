import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';

@Injectable()
export class ReferenceRepository {
  constructor(private readonly sqlServer: SqlServerService) {}

  // ─── Main-1 reference procs ───

  async getCountries(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_Country_Get_V1', {
      Code: { type: sql.NVarChar(50), value: query.code ?? null },
      countryId: { type: sql.Int(), value: query.countryId ? Number(query.countryId) : null },
      isEUCountry: { type: sql.TinyInt(), value: query.isEUCountry ?? null },
      isDRRegistrationCountry: { type: sql.TinyInt(), value: query.isDRRegistrationCountry ?? null },
      isCFSRegistrationCountry: { type: sql.TinyInt(), value: query.isCFSRegistrationCountry ?? null },
      isCFSOrderCountry: { type: sql.TinyInt(), value: query.isCFSOrderCountry ?? null },
      isGlobalAPICountries: { type: sql.TinyInt(), value: query.isGlobalAPICountries ?? null },
      countryName: { type: sql.NVarChar(256), value: query.countryName ?? null },
      isActive: { type: sql.TinyInt(), value: query.isActive ?? null },
      isEEAandSwitzerland: { type: sql.TinyInt(), value: query.isEEAandSwitzerland ?? null },
      isEEACandidateCountry: { type: sql.TinyInt(), value: query.isEEACandidateCountry ?? null },
      startPos: { type: sql.Int(), value: query.startPos ? Number(query.startPos) : null },
      noOfRows: { type: sql.Int(), value: query.noOfRows ? Number(query.noOfRows) : null },
    });
  }

  async getTitles(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_Title_Get', {
      code: { type: sql.NVarChar(50), value: query.code ?? null },
      titleId: { type: sql.Int(), value: query.titleId ? Number(query.titleId) : null },
    });
  }

  async getServices(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_Common_Service_Get', {
      Code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getApplicationTypes(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_Application_Types_Get', {
      serviceId: { type: sql.VarChar(50), value: query.serviceId ?? null },
      isBusiness: { type: sql.TinyInt(), value: query.isBusiness ?? null },
    });
  }

  async getPartyCategories(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_Party_Category_Get_V1', {
      Code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getApplicationStatuses(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_Application_Status_Get', {
      StatusType: { type: sql.NVarChar(50), value: query.statusType ?? null },
    });
  }

  async getOrganisationRegistrationStatuses(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_ORGANISATION_REGISTRATION_STATUS_Get', {
      ORGANISATION_REGISTRATION_STATUS_ID: { type: sql.SmallInt(), value: query.id ? Number(query.id) : null },
    });
  }

  async getOrganisationDescriptions(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_ORGANISATION_DESCRIPTION_GET', {
      organisationId: { type: sql.Int(), value: query.organisationId ? Number(query.organisationId) : null },
      organisationDescription: { type: sql.NVarChar(256), value: query.organisationDescription ?? null },
      isActive: { type: sql.TinyInt(), value: query.isActive ?? null },
    });
  }

  async getDeviceTypeFilters() {
    return this.sqlServer.callProc('dbo.usp_API_REF_DEVICE_TYPE_FILTER_Get', {});
  }

  async getNotifiedBodies(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_Notified_Body_Get_V1', {
      notifiedBodyId: { type: sql.Int(), value: query.notifiedBodyId ? Number(query.notifiedBodyId) : null },
      notifiedBodyCode: { type: sql.NVarChar(50), value: query.notifiedBodyCode ?? null },
      notifiedBodyReference: { type: sql.NVarChar(256), value: query.notifiedBodyReference ?? null },
      countryCode: { type: sql.NVarChar(10), value: query.countryCode ?? null },
      startPos: { type: sql.Int(), value: query.startPos ? Number(query.startPos) : null },
      noOfRows: { type: sql.Int(), value: query.noOfRows ? Number(query.noOfRows) : null },
      sortField: { type: sql.VarChar(50), value: query.sortField ?? null },
      isAscending: { type: sql.Bit(), value: query.isAscending != null ? query.isAscending === 'true' : null },
    });
  }

  async getRejectionReasons(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_RejectionReasons_ByType_Get', {
      typeCode: { type: sql.NVarChar(50), value: query.typeCode ?? null },
    });
  }

  async getUnregistrationReasons(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_PARTY_CATEGORY_UNREGISTER_REASON_Get', {
      partyCategoryCode: { type: sql.NVarChar(50), value: query.partyCategoryCode ?? null },
      ReasonCode: { type: sql.NVarChar(50), value: query.reasonCode ?? null },
    });
  }

  async getDeviceRegistrationFurtherInfo(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_DEVICE_REGISTRATION_FURTHER_INFORMATION_Get', {
      deviceRegistrationFurtherInformationId: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      deviceRegistrationFurtherInformationCode: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getPriceCatalogues(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_PriceCatalogues_Get', {
      catalogueType: { type: sql.NVarChar(50), value: query.catalogueType ?? null },
    });
  }

  async getPaymentMethods(query: any) {
    return this.sqlServer.callProc('dbo.usp_REF_PAYMENT_METHOD_Get', {
      paymentMethodCode: { type: sql.NVarChar(50), value: query.paymentMethodCode ?? null },
    });
  }

  async getPaymentStatuses(query: any) {
    return this.sqlServer.callProc('dbo.usp_REF_PAYMENT_STATUS_Get', {
      paymentStatusCode: { type: sql.NVarChar(50), value: query.paymentStatusCode ?? null },
    });
  }

  async getBankAccounts() {
    return this.sqlServer.callProc('dbo.usp_REF_BANK_ACCOUNT_Get', {});
  }

  async getAccountRejectionReasons(query: any) {
    return this.sqlServer.callProc('dbo.usp_REF_ACCOUNT_REJECTION_REASON_Get', {
      ACCOUNT_REJECTION_REASON_CODE: { type: sql.NVarChar(50), value: query.code ?? null },
      ACCOUNT_REJECTION_REASON_ID: { type: sql.Int(), value: query.id ? Number(query.id) : null },
    });
  }

  async getDraftAccountRejectReasons(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_ACCOUNT_REJECTION_REASON_DRAFT_Get', {
      ACCOUNT_REJECTION_REASON_CODE: { type: sql.VarChar(50), value: query.code ?? null },
      startPos: { type: sql.Int(), value: query.startPos ? Number(query.startPos) : null },
      noOfRows: { type: sql.Int(), value: query.noOfRows ? Number(query.noOfRows) : null },
    });
  }

  async getDeviceTypeCertificateText(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_DEVICE_TYPE_CERTIFICATE_TEXT_Get', {
      deviceId: { type: sql.Int(), value: query.deviceId ? Number(query.deviceId) : null },
    });
  }

  async getUnregisterAppRejectionReasons(query: any) {
    return this.sqlServer.callProc('dbo.usp_REF_PARTY_UNREGISTER_APPLICATION_REJECTION_REASON_Get', {
      Code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  // ─── Main-2 reference procs ───

  async getDeviceTypes(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_DEVICE_TYPE_Get', {
      deviceTypeId: { type: sql.Int(), value: query.deviceTypeId ? Number(query.deviceTypeId) : null },
      code: { type: sql.Int(), value: query.code ? Number(query.code) : null },
    });
  }

  async getGMDNs(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_GMDN_Get', {
      GMDN_CODE: { type: sql.Int(), value: query.gmdnCode ? Number(query.gmdnCode) : null },
      DEVICE_TYPE_ID: { type: sql.Int(), value: query.deviceTypeId ? Number(query.deviceTypeId) : null },
      TERM_NAME: { type: sql.NVarChar(256), value: query.termName ?? null },
      GMDN_DESC: { type: sql.NVarChar(256), value: query.gmdnDesc ?? null },
      GMDN_ID: { type: sql.Int(), value: query.gmdnId ? Number(query.gmdnId) : null },
      ISACTIVE: { type: sql.SmallInt(), value: query.isActive ?? null },
      MODIFIED_DATE: { type: sql.Date(), value: query.modifiedDate ?? null },
      startPos: { type: sql.Int(), value: query.startPos ? Number(query.startPos) : null },
      noOfRows: { type: sql.Int(), value: query.noOfRows ? Number(query.noOfRows) : null },
      sortField: { type: sql.VarChar(50), value: query.sortField ?? null },
      isAscending: { type: sql.Bit(), value: query.isAscending != null ? query.isAscending === 'true' : null },
    });
  }

  async getDeviceGuidanceHelptext(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_Device_Guidance_Helptext_Get', {
      Code: { type: sql.NVarChar(50), value: query.code ?? null },
      DEVICE_RISK_CLASSIFICATION_ID: { type: sql.SmallInt(), value: query.riskClassId ? Number(query.riskClassId) : null },
      DEVICE_TYPE_ID: { type: sql.SmallInt(), value: query.deviceTypeId ? Number(query.deviceTypeId) : null },
    });
  }

  // ─── Main-3 reference procs ───

  async getGenders(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_GENDER_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getOrganisationFurtherInfo(query: any) {
    return this.sqlServer.callProc('dbo.usp_REF_ORGANISATION_DETAIL_FURTHER_INFORMATION_BY_ORG_ROLE_Get', {
      organisationDetailFurtherinformationId: { type: sql.SmallInt(), value: query.id ? Number(query.id) : null },
      organisationDetailFurtherInformationCode: { type: sql.NVarChar(50), value: query.code ?? null },
      organisationId: { type: sql.Int(), value: query.organisationId ? Number(query.organisationId) : null },
      applicationReferenceNumber: { type: sql.VarChar(50), value: query.applicationReferenceNumber ?? null },
    });
  }

  async getPartyEventCommunicationType(query: any) {
    return this.sqlServer.callProc('dbo.API_REF_PARTY_EVENT_COMMUNICATION_TYPE_Get', {
      Code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getPartyEventCommunicationDirection(query: any) {
    return this.sqlServer.callProc('dbo.API_REF_PARTY_EVENT_COMMUNICATION_DIRECTION_Get', {
      Code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHumanitarianCaseWorkflowStatus(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HUMANITARIAN_CASE_WORKFLOW_STATUS_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHumanitarianCaseUserType(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HUMANITARIAN_CASE_USER_TYPE_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getDocumentTypes(query: any) {
    return this.sqlServer.callProc('dbo.usp_REF_Document_Type_Get', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoAdverseBloodIncidentType(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_ADVERSE_BLOOD_INCIDENT_TYPE_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoEventType(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_EVENT_TYPE_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  // ─── Haemo reference procs (main-1) ───

  async getHaemoBloodProduct(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_BLOOD_PRODUCT_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoEventInvolve(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_EVENT_INVOLVE_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoImplicatedBloodComponent(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_IMPLICATED_BLOOD_COMPONENT_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
      isReportable: { type: sql.Bit(), value: query.isReportable != null ? query.isReportable === 'true' : null },
      isImplicatedComponent: { type: sql.Bit(), value: query.isImplicatedComponent != null ? query.isImplicatedComponent === 'true' : null },
    });
  }

  async getHaemoImputabilityLevel(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_IMPUTABILITY_LEVEL_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoLocationOfIncident(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_LOCATION_OF_INCIDENT_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoReactionType(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_REACTION_TYPE_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoSpecification(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_SPECIFICATION_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoMhraStatus(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_MHRA_STATUS_Get', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoIncidentStatus(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_INCIDENT_STATUS_Get', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoReportWorkflow(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_REPORT_WORKFLOW_Get', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoIncidentCategory(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_INCIDENT_CATEGORY_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
      categoryType: { type: sql.NVarChar(50), value: query.categoryType ?? null },
    });
  }

  async getDerogationsUkHospitalsShare(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_DEROGATIONS_UK_HOSPITALS_SHARE', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getDerogationsWorkflow(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_DEROGATIONS_WORKFLOW_GET', {
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async getHaemoTableSearch(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_TABLE_SEARCH_GET', {
      code: { type: sql.NVarChar(50), value: query.code ?? null },
    });
  }

  async postHaemoTable(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_TABLE_POST', {
      refTableName: { type: sql.NVarChar(256), value: params.refTableName },
      code: { type: sql.NVarChar(50), value: params.code },
      desc: { type: sql.NVarChar(256), value: params.desc ?? null },
      categoryType: { type: sql.NVarChar(50), value: params.categoryType ?? null },
      confirmationReminderDays: { type: sql.Int(), value: params.confirmationReminderDays ?? null },
    });
  }

  async patchHaemoTable(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_TABLE_PATCH', {
      refTableName: { type: sql.NVarChar(256), value: params.refTableName },
      code: { type: sql.NVarChar(50), value: params.code },
      desc: { type: sql.NVarChar(256), value: params.desc ?? null },
      categoryType: { type: sql.NVarChar(50), value: params.categoryType ?? null },
      confirmationReminderDays: { type: sql.Int(), value: params.confirmationReminderDays ?? null },
    });
  }

  async deleteHaemoTable(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_TABLE_DELETE', {
      refTableName: { type: sql.NVarChar(256), value: params.refTableName },
      code: { type: sql.NVarChar(50), value: params.code },
    });
  }

  // ─── Main-4 / Main-5 / Main-6 procs ───

  async getDeviceGuidanceHelptextCertificateType(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_Device_Guidance_Helptext_Certificate_Type_Get', {
      deviceTypeId: { type: sql.Int(), value: query.deviceTypeId ? Number(query.deviceTypeId) : null },
      DeviceRiskClassificationId: { type: sql.Int(), value: query.riskClassificationId ? Number(query.riskClassificationId) : null },
      isCustom: { type: sql.TinyInt(), value: query.isCustom ?? null },
      isSterile: { type: sql.TinyInt(), value: query.isSterile ?? null },
      isMeasurable: { type: sql.TinyInt(), value: query.isMeasurable ?? null },
    });
  }

  async getHaemoExclusionReason(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_EXCLUSION_REASON_GET', {
      code: { type: sql.VarChar(50), value: query.code ?? null },
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
    });
  }

  async getHaemoTableEntry(query: any) {
    return this.sqlServer.callProc('dbo.usp_API_REF_HAEMO_TABLE_ENTRY_GET', {
      code: { type: sql.VarChar(50), value: query.code ?? null },
      id: { type: sql.Int(), value: query.id ? Number(query.id) : null },
    });
  }

  async getContactCategoryType() {
    return this.sqlServer.callProc('dbo.usp_API_REF_Contact_Category_Type_Get', {});
  }

  async getOrganisationTypes(query: any) {
    return this.sqlServer.callProc('dbo.usp_REF_ORGANISATION_TYPE_Get', {
      organisationTypeId: { type: sql.Int(), value: query.organisationTypeId ? Number(query.organisationTypeId) : null },
      code: { type: sql.VarChar(50), value: query.code ?? null },
    });
  }
}
