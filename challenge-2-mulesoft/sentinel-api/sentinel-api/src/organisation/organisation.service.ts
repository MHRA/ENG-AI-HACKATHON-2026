import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganisationRepository } from './organisation.repository';

@Injectable()
export class OrganisationService {
  constructor(private readonly repo: OrganisationRepository) {}

  async searchOrganisations(query: any) {
    const result = await this.repo.searchOrganisations({
      organisationIds: query.organisationIds,
      organisationName: query.organisationName,
      serviceIds: query.serviceIds,
      registrationStatusIds: query.registrationStatusIds,
      startPos: query.startPos ? Number(query.startPos) : undefined,
      noOfRows: query.noOfRows ? Number(query.noOfRows) : undefined,
      sortField: query.sortField,
      isAscending: query.isAscending != null ? query.isAscending === 'true' : undefined,
    });
    return result.recordset;
  }

  async getOrganisationById(organisationId: number) {
    const result = await this.repo.getOrganisationDetail(organisationId);
    if (!result.recordset || result.recordset.length === 0) {
      throw new NotFoundException(`Organisation ${organisationId} not found`);
    }
    return result.recordset[0];
  }

  async getParentAssociation(organisationId: number) {
    const result = await this.repo.getParentAssociation(organisationId);
    return result.recordset;
  }

  async getNotes(query: any) {
    const result = await this.repo.getPartyNotes(query);
    return result.recordset;
  }

  async createNote(body: any) {
    const result = await this.repo.createPartyNote(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async getMigrationGracePeriod(query: any) {
    const result = await this.repo.getMigrationGracePeriod(query);
    return result.recordset;
  }

  async register(body: any) {
    const result = await this.repo.registerOrganisation(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async updateRegistration(body: any) {
    const result = await this.repo.updateOrganisationRegistration(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async approveRegistration(body: any) {
    const result = await this.repo.approveRegistration(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async unregister(body: any) {
    const result = await this.repo.unregisterOrganisation(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async createAccount(body: any) {
    const result = await this.repo.createAccount(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async getCompliance(organisationId: string) {
    const result = await this.repo.getCompliance(organisationId);
    return result.recordset;
  }

  async createCompliance(body: any) {
    const result = await this.repo.createCompliance(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async updateCompliance(body: any) {
    const result = await this.repo.updateCompliance(body);
    return result.recordset?.[0] ?? { success: true };
  }
}
