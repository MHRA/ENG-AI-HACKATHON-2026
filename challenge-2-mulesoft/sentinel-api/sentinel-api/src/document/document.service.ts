import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from './document.repository';

@Injectable()
export class DocumentService {
  constructor(private readonly repo: DocumentRepository) {}

  async getDocuments(query: any) {
    const params = {
      ...query,
      organisationId: query.organisationId ? Number(query.organisationId) : undefined,
      documentTypeId: query.documentTypeId ? Number(query.documentTypeId) : undefined,
      startPos: query.startPos ? Number(query.startPos) : undefined,
      noOfRows: query.noOfRows ? Number(query.noOfRows) : undefined,
      isAscending: query.isAscending != null ? query.isAscending === 'true' : undefined,
    };

    if (query.partyEventCommunicationId) {
      const result = await this.repo.getCommunicationDocuments(params);
      return result.recordset;
    }

    if (query.deviceId || query.productId) {
      const result = await this.repo.getDeviceProductDocuments(params);
      return result.recordset;
    }

    if (query.isCfs === 'true') {
      const result = await this.repo.getCfsApplicationDocuments(params);
      return result.recordset;
    }

    if (query.isDeviceDocument === 'true') {
      const result = await this.repo.getOrganisationDeviceDocuments(params);
      return result.recordset;
    }

    if (query.isRepresentative === 'true') {
      const result = await this.repo.getRepresentativeDocuments(params);
      return result.recordset;
    }

    const result = await this.repo.getOrganisationDocuments(params);
    return result.recordset;
  }

  async getDocumentById(documentId: number) {
    const result = await this.repo.getDocumentDetail(documentId);
    if (!result.recordset || result.recordset.length === 0) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }
    return result.recordset[0];
  }
}
