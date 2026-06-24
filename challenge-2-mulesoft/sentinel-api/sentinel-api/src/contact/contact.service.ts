import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactRepository } from './contact.repository';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async getContacts(query: any) {
    if (query.isDuplicateCheck === 'true') {
      const result = await this.contactRepository.checkDuplicate({
        firstName: query.firstName,
        surname: query.surname,
        emailAddress: query.emailAddress,
        editMode: query.editMode ? Number(query.editMode) : undefined,
        organisationId: query.organisationId ? Number(query.organisationId) : undefined,
        individualId: query.individualId ? Number(query.individualId) : undefined,
        startPos: query.startPos ? Number(query.startPos) : undefined,
        noOfRows: query.noOfRows ? Number(query.noOfRows) : undefined,
      });
      return result.recordset;
    }

    const result = await this.contactRepository.getOrganisationContacts({
      organisationId: query.organisationId ? Number(query.organisationId) : undefined,
      userName: query.userName,
      isMainContact: query.isMainContact ? Number(query.isMainContact) : undefined,
      individualId: query.individualId ? Number(query.individualId) : undefined,
      returnAllContacts: query.returnAllContacts ? Number(query.returnAllContacts) : undefined,
      isUser: query.isUser ? Number(query.isUser) : undefined,
      startPos: query.startPos ? Number(query.startPos) : undefined,
      noOfRows: query.noOfRows ? Number(query.noOfRows) : undefined,
      sortField: query.sortField,
      isAscending: query.isAscending != null ? query.isAscending === 'true' : undefined,
    });
    return result.recordset;
  }

  async getContactById(contactId: number) {
    const result = await this.contactRepository.getOrganisationContacts({
      individualId: contactId,
    });
    if (!result.recordset || result.recordset.length === 0) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }
    return result.recordset[0];
  }

  async createContact(dto: any) {
    const result = await this.contactRepository.createContact(dto);
    return result.recordset?.[0] ?? { success: true };
  }

  async updateContact(contactId: number, dto: any) {
    const result = await this.contactRepository.updateContact({
      IndividualId: contactId,
      ...dto,
    });
    return result.recordset?.[0] ?? { success: true };
  }

  async deleteContacts(orgId: number, contactIds: number[], userId: number) {
    await this.contactRepository.deleteContacts(orgId, contactIds, userId);
    return { deleted: contactIds.length, contactIds };
  }
}
