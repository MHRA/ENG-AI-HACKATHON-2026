import { Injectable, BadRequestException } from '@nestjs/common';
import { ReferenceRepository } from './reference.repository';

@Injectable()
export class ReferenceService {
  constructor(private readonly repo: ReferenceRepository) {}

  async getByCategory(category: string, query: any) {
    const result = await this.resolveCategory(category, query);
    return result.recordset;
  }

  async postHaemoTable(body: any) {
    const result = await this.repo.postHaemoTable(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async patchHaemoTable(body: any) {
    const result = await this.repo.patchHaemoTable(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async deleteHaemoTable(body: any) {
    const result = await this.repo.deleteHaemoTable(body);
    return result.recordset?.[0] ?? { success: true };
  }

  private resolveCategory(category: string, query: any) {
    switch (category) {
      case 'countries': return this.repo.getCountries(query);
      case 'titles': return this.repo.getTitles(query);
      case 'services': return this.repo.getServices(query);
      case 'application-types': return this.repo.getApplicationTypes(query);
      case 'party-categories': return this.repo.getPartyCategories(query);
      case 'application-statuses': return this.repo.getApplicationStatuses(query);
      case 'organisation-registration-statuses': return this.repo.getOrganisationRegistrationStatuses(query);
      case 'organisation-descriptions': return this.repo.getOrganisationDescriptions(query);
      case 'device-type-filters': return this.repo.getDeviceTypeFilters();
      case 'notified-bodies': return this.repo.getNotifiedBodies(query);
      case 'rejection-reasons': return this.repo.getRejectionReasons(query);
      case 'unregistration-reasons': return this.repo.getUnregistrationReasons(query);
      case 'device-registration-further-info': return this.repo.getDeviceRegistrationFurtherInfo(query);
      case 'price-catalogues': return this.repo.getPriceCatalogues(query);
      case 'payment-methods': return this.repo.getPaymentMethods(query);
      case 'payment-statuses': return this.repo.getPaymentStatuses(query);
      case 'bank-accounts': return this.repo.getBankAccounts();
      case 'account-rejection-reasons': return this.repo.getAccountRejectionReasons(query);
      case 'draft-account-rejection-reasons': return this.repo.getDraftAccountRejectReasons(query);
      case 'device-type-certificate-text': return this.repo.getDeviceTypeCertificateText(query);
      case 'unregister-app-rejection-reasons': return this.repo.getUnregisterAppRejectionReasons(query);
      case 'device-types': return this.repo.getDeviceTypes(query);
      case 'gmdns': return this.repo.getGMDNs(query);
      case 'device-guidance-helptext': return this.repo.getDeviceGuidanceHelptext(query);
      case 'genders': return this.repo.getGenders(query);
      case 'organisation-further-info': return this.repo.getOrganisationFurtherInfo(query);
      case 'party-event-communication-types': return this.repo.getPartyEventCommunicationType(query);
      case 'party-event-communication-directions': return this.repo.getPartyEventCommunicationDirection(query);
      case 'humanitarian-case-workflow-statuses': return this.repo.getHumanitarianCaseWorkflowStatus(query);
      case 'humanitarian-case-user-types': return this.repo.getHumanitarianCaseUserType(query);
      case 'document-types': return this.repo.getDocumentTypes(query);
      case 'haemo-adverse-blood-incident-types': return this.repo.getHaemoAdverseBloodIncidentType(query);
      case 'haemo-event-types': return this.repo.getHaemoEventType(query);
      case 'haemo-blood-products': return this.repo.getHaemoBloodProduct(query);
      case 'haemo-event-involve': return this.repo.getHaemoEventInvolve(query);
      case 'haemo-implicated-blood-components': return this.repo.getHaemoImplicatedBloodComponent(query);
      case 'haemo-imputability-levels': return this.repo.getHaemoImputabilityLevel(query);
      case 'haemo-location-of-incident': return this.repo.getHaemoLocationOfIncident(query);
      case 'haemo-reaction-types': return this.repo.getHaemoReactionType(query);
      case 'haemo-specifications': return this.repo.getHaemoSpecification(query);
      case 'haemo-mhra-statuses': return this.repo.getHaemoMhraStatus(query);
      case 'haemo-incident-statuses': return this.repo.getHaemoIncidentStatus(query);
      case 'haemo-report-workflows': return this.repo.getHaemoReportWorkflow(query);
      case 'haemo-incident-categories': return this.repo.getHaemoIncidentCategory(query);
      case 'derogations-uk-hospitals-share': return this.repo.getDerogationsUkHospitalsShare(query);
      case 'derogations-workflows': return this.repo.getDerogationsWorkflow(query);
      case 'haemo-table-search': return this.repo.getHaemoTableSearch(query);
      case 'device-guidance-helptext-certificate-type': return this.repo.getDeviceGuidanceHelptextCertificateType(query);
      case 'haemo-exclusion-reasons': return this.repo.getHaemoExclusionReason(query);
      case 'haemo-table-entries': return this.repo.getHaemoTableEntry(query);
      case 'contact-category-types': return this.repo.getContactCategoryType();
      case 'organisation-types': return this.repo.getOrganisationTypes(query);
      default:
        throw new BadRequestException(`Unknown reference category: ${category}`);
    }
  }
}
