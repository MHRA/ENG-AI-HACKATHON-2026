import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';

@Injectable()
export class ContactRepository {
  constructor(private readonly sqlServer: SqlServerService) {}

  async checkDuplicate(params: {
    firstName?: string;
    surname?: string;
    emailAddress?: string;
    editMode?: number;
    organisationId?: number;
    individualId?: number;
    startPos?: number;
    noOfRows?: number;
  }) {
    return this.sqlServer.callProc('dbo.usp_API_CHECK_ACCOUNT_DUPLICATE_Get', {
      firstName: { type: sql.VarChar(256), value: params.firstName ?? null },
      surname: { type: sql.VarChar(256), value: params.surname ?? null },
      emailAddress: { type: sql.VarChar(256), value: params.emailAddress ?? null },
      editMode: { type: sql.TinyInt(), value: params.editMode ?? null },
      organisationId: { type: sql.Int(), value: params.organisationId ?? null },
      individualId: { type: sql.Int(), value: params.individualId ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
    });
  }

  async getOrganisationContacts(params: {
    organisationId?: number;
    userName?: string;
    isMainContact?: number;
    individualId?: number;
    returnAllContacts?: number;
    isUser?: number;
    startPos?: number;
    noOfRows?: number;
    sortField?: string;
    isAscending?: boolean;
  }) {
    return this.sqlServer.callProc('dbo.usp_API_Organisation_Contact_Get', {
      organisationId: { type: sql.Int(), value: params.organisationId ?? null },
      userName: { type: sql.VarChar(256), value: params.userName ?? null },
      isMainContact: { type: sql.TinyInt(), value: params.isMainContact ?? null },
      individualId: { type: sql.Int(), value: params.individualId ?? null },
      returnAllContacts: { type: sql.TinyInt(), value: params.returnAllContacts ?? null },
      isUser: { type: sql.Int(), value: params.isUser ?? null },
      startPos: { type: sql.Int(), value: params.startPos ?? null },
      noOfRows: { type: sql.Int(), value: params.noOfRows ?? null },
      sortField: { type: sql.VarChar(50), value: params.sortField ?? null },
      isAscending: { type: sql.Bit(), value: params.isAscending ?? null },
    });
  }

  async createContact(params: {
    orgId: number;
    parentOrgId?: number;
    titleId?: number;
    firstName: string;
    surname: string;
    middleName?: string;
    initials?: string;
    jobTitle?: string;
    isMainContact?: boolean;
    individualTelephone?: string;
    individualEMail?: string;
    eventId?: number;
    eventVersion?: number;
    userId?: string;
    userName?: string;
    associationFromDate?: string;
  }) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Module_Individual_Post', {
      orgId: { type: sql.Int(), value: params.orgId },
      parentOrgId: { type: sql.Int(), value: params.parentOrgId ?? null },
      titleId: { type: sql.Int(), value: params.titleId ?? null },
      firstName: { type: sql.NVarChar(256), value: params.firstName },
      surname: { type: sql.NVarChar(256), value: params.surname },
      middleName: { type: sql.NVarChar(256), value: params.middleName ?? null },
      initials: { type: sql.VarChar(10), value: params.initials ?? null },
      jobTitle: { type: sql.NVarChar(256), value: params.jobTitle ?? null },
      isMainContact: { type: sql.Bit(), value: params.isMainContact ?? null },
      individualTelephone: { type: sql.NVarChar(50), value: params.individualTelephone ?? null },
      individualEMail: { type: sql.NVarChar(256), value: params.individualEMail ?? null },
      eventId: { type: sql.Int(), value: params.eventId ?? null },
      eventVersion: { type: sql.Int(), value: params.eventVersion ?? null },
      userId: { type: sql.VarChar(100), value: params.userId ?? null },
      userName: { type: sql.VarChar(100), value: params.userName ?? null },
      associationFromDate: { type: sql.Date(), value: params.associationFromDate ?? null },
    });
  }

  async updateContact(params: {
    IndividualId: number;
    orgId?: number;
    parentOrgId?: number;
    titleId?: number;
    firstName?: string;
    surname?: string;
    middleName?: string;
    initials?: string;
    jobTitle?: string;
    isMainContact?: boolean;
    individualTelephone?: string;
    individualEMail?: string;
    eventId?: number;
    eventVersion?: number;
    userId?: string;
    createUser?: boolean;
    userName?: string;
    activateUser?: boolean;
  }) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Module_Individual_Put', {
      IndividualId: { type: sql.Int(), value: params.IndividualId },
      orgId: { type: sql.Int(), value: params.orgId ?? null },
      parentOrgId: { type: sql.Int(), value: params.parentOrgId ?? null },
      titleId: { type: sql.Int(), value: params.titleId ?? null },
      firstName: { type: sql.NVarChar(256), value: params.firstName ?? null },
      surname: { type: sql.NVarChar(256), value: params.surname ?? null },
      middleName: { type: sql.NVarChar(256), value: params.middleName ?? null },
      initials: { type: sql.VarChar(10), value: params.initials ?? null },
      jobTitle: { type: sql.NVarChar(256), value: params.jobTitle ?? null },
      isMainContact: { type: sql.Bit(), value: params.isMainContact ?? null },
      individualTelephone: { type: sql.NVarChar(50), value: params.individualTelephone ?? null },
      individualEMail: { type: sql.NVarChar(256), value: params.individualEMail ?? null },
      eventId: { type: sql.Int(), value: params.eventId ?? null },
      eventVersion: { type: sql.Int(), value: params.eventVersion ?? null },
      userId: { type: sql.VarChar(100), value: params.userId ?? null },
      createUser: { type: sql.Bit(), value: params.createUser ?? null },
      userName: { type: sql.VarChar(100), value: params.userName ?? null },
      activateUser: { type: sql.Bit(), value: params.activateUser ?? null },
    });
  }

  async deleteContacts(orgId: number, contactIds: number[], userId: number) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_Module_Individual_Delete', {
      orgId: { type: sql.Int(), value: orgId },
      removeContactList_JSON: {
        type: sql.NVarChar(sql.MAX),
        value: JSON.stringify({ RemoveContactList: contactIds.map(id => ({ IndividualId: id })) }),
      },
      userId: { type: sql.Int(), value: userId },
    });
  }
}
