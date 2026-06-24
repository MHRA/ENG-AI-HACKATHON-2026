import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';

@Injectable()
export class ApplicationService {
  constructor(private readonly repo: ApplicationRepository) {}

  async getApplications(query: any) {
    if (query.organisationIds) {
      const result = await this.repo.getInProgressApplications(query.organisationIds, query.activityTypeIds);
      return result.recordset;
    }

    if (query.parentApplicationReferenceNumber) {
      const result = await this.repo.getFurtherInfo(
        query.parentApplicationReferenceNumber,
        query.organisationId ? Number(query.organisationId) : undefined,
        query.childApplicationReferenceNumber,
      );
      return result.recordset;
    }

    if (query.eventReferenceNumber) {
      const result = await this.repo.getRelatedApplicationsCount(query.eventReferenceNumber);
      return result.recordset;
    }

    if (query.isUnregister === 'true' && query.applicationRefNumber) {
      const result = await this.repo.getUnregisterApplication(query.applicationRefNumber);
      return result.recordset;
    }

    if (query.isCfsCountries === 'true' && query.applicationRefNumber) {
      const result = await this.repo.getCfsCountries(
        query.applicationRefNumber,
        query.startPos ? Number(query.startPos) : undefined,
        query.noOfRows ? Number(query.noOfRows) : undefined,
        query.sortField,
        query.isAscendingFlag != null ? query.isAscendingFlag === 'true' : undefined,
      );
      return result.recordset;
    }

    const result = await this.repo.getWorkInProgressItems({
      ...query,
      startPos: query.startPos ? Number(query.startPos) : undefined,
      noOfRows: query.noOfRows ? Number(query.noOfRows) : undefined,
      includeCompleted: query.includeCompleted ? Number(query.includeCompleted) : undefined,
      isDraft: query.isDraft ? Number(query.isDraft) : undefined,
      isAscendingFlag: query.isAscendingFlag != null ? query.isAscendingFlag === 'true' : undefined,
    });
    return result.recordset;
  }

  async getApplicationByRef(applicationReferenceNumber: string) {
    const result = await this.repo.getApplicationDetail(applicationReferenceNumber);
    if (!result.recordset || result.recordset.length === 0) {
      throw new NotFoundException(`Application ${applicationReferenceNumber} not found`);
    }
    return result.recordset[0];
  }
}
