import { Injectable } from '@nestjs/common';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(private readonly repo: EventRepository) {}

  // ──── GET operations ────

  async getApplicationOrganisationInprogress(query: any) {
    const result = await this.repo.getApplicationOrganisationInprogress(query);
    return result.recordset;
  }

  async getApplicationDeviceInprogress(query: any) {
    const result = await this.repo.getApplicationDeviceInprogress(query);
    return result.recordset;
  }

  async getOrganisationNamePreviousCurrent(organisationId: number, eventRefNumber: string) {
    const result = await this.repo.getOrganisationNamePreviousCurrent(organisationId, eventRefNumber);
    return result.recordset;
  }

  async getFurtherInfoApplicationEvent(query: any) {
    const result = await this.repo.getFurtherInfoApplicationEvent(query);
    return result.recordset;
  }

  async getChildApplicationFurtherInfoCount(eventRefId: string) {
    const result = await this.repo.getChildApplicationFurtherInfoCount(eventRefId);
    return result.recordset?.[0] ?? { count: 0 };
  }

  async getUnregisterApplication(eventRefId: string) {
    const result = await this.repo.getUnregisterApplication(eventRefId);
    return result.recordset;
  }

  async getCfsCountryList(eventRefId: string) {
    const result = await this.repo.getCfsCountryList(eventRefId);
    return result.recordset;
  }

  async searchHaemoIncidents(query: any) {
    const result = await this.repo.searchHaemoIncidents(query);
    return result.recordset;
  }

  async searchExceptionalUseIncidents(query: any) {
    const result = await this.repo.searchExceptionalUseIncidents(query);
    return result.recordset;
  }

  async getExceptionalUseDeviceSearch(eventRefNumber: string, deviceId: number) {
    const result = await this.repo.getExceptionalUseDeviceSearch(eventRefNumber, deviceId);
    return result.recordset;
  }

  async getApplicationWorkInProgress(query: any) {
    const result = await this.repo.getApplicationWorkInProgress(query);
    return result.recordset;
  }

  async getApplicationDetail(eventRefId: string) {
    const result = await this.repo.getApplicationDetail(eventRefId);
    return result.recordset?.[0] ?? null;
  }

  async getHaemoCaseFootnote(query: any) {
    const result = await this.repo.getHaemoCaseFootnote(query);
    return result.recordset;
  }

  async getHaemoCaseReviewAuditlog(query: any) {
    const result = await this.repo.getHaemoCaseReviewAuditlog(query);
    return result.recordset;
  }

  async getHaemoCaseComments(eventRefNumber: string) {
    const result = await this.repo.getHaemoCaseComments(eventRefNumber);
    return result.recordset;
  }

  // ──── PATCH operations ────

  async patchHaemoIncident(body: any) {
    const result = await this.repo.patchHaemoIncident(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async patchHumanitarianStatusDecision(body: any) {
    const result = await this.repo.patchHumanitarianStatusDecision(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async transferIncidents(body: any) {
    const result = await this.repo.transferIncidents(body);
    return result.recordset?.[0] ?? { success: true };
  }

  // ──── POST operations ────

  async postHumanitarianConsultant(body: any) {
    const result = await this.repo.postHumanitarianConsultant(body.consultantDetails);
    return result.recordset?.[0] ?? { success: true };
  }

  async postFurtherInfoApplicationEvent(body: any) {
    const result = await this.repo.postFurtherInfoApplicationEvent(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async postHaemoSeriousIncidentConfirmation(body: any) {
    const result = await this.repo.postHaemoSeriousIncidentConfirmation(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async postHaemoFootnoteDocument(body: any) {
    const result = await this.repo.postHaemoFootnoteDocument(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async postCfsOrderApplication(body: any) {
    const result = await this.repo.postCfsOrderApplication(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async postHaemoCaseComments(body: any) {
    const result = await this.repo.postHaemoCaseComments(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async postHumanitarianCaseComments(body: any) {
    const result = await this.repo.postHumanitarianCaseComments(body.comments);
    return result.recordset?.[0] ?? { success: true };
  }

  async postCfsApplicationDocument(body: any) {
    const result = await this.repo.postCfsApplicationDocument(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async postExceptionalUseAttachDocument(body: any) {
    const result = await this.repo.postExceptionalUseAttachDocument(body.humanitarianDocuments);
    return result.recordset?.[0] ?? { success: true };
  }

  // ──── PUT operations ────

  async putDocumentStorageIdentifier(body: any) {
    const result = await this.repo.putDocumentStorageIdentifier(body.docJson);
    return result.recordset?.[0] ?? { success: true };
  }

  async putApplicationOrganisationRegistrationStatus(body: any) {
    const result = await this.repo.putApplicationOrganisationRegistrationStatus(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async putApplicationDeviceRegistrationStatus(body: any) {
    const result = await this.repo.putApplicationDeviceRegistrationStatus(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async putApplicationOrganisationDraft(body: any) {
    const result = await this.repo.putApplicationOrganisationDraft(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async putApplicationAssignment(body: any) {
    const result = await this.repo.putApplicationAssignment(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async putCfsOrderApplicationStatus(body: any) {
    const result = await this.repo.putCfsOrderApplicationStatus(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async putFurtherInfoApplicationEvent(body: any) {
    const result = await this.repo.putFurtherInfoApplicationEvent(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async putDerogationsFinalDecision(body: any) {
    const result = await this.repo.putDerogationsFinalDecision(body.decision);
    return result.recordset?.[0] ?? { success: true };
  }

  async putDerogationsDctCommentsSupportingDocs(body: any) {
    const result = await this.repo.putDerogationsDctCommentsSupportingDocs(body.comments);
    return result.recordset?.[0] ?? { success: true };
  }

  async putDerogationsCorrespondenceDecisionDocuments(body: any) {
    const result = await this.repo.putDerogationsCorrespondenceDecisionDocuments(body.derogationDocuments);
    return result.recordset?.[0] ?? { success: true };
  }
}
