import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';

@Injectable()
export class ShotRepository {
  constructor(private readonly sqlServer: SqlServerService) {}

  // GET procs - no input parameters (poll for pending SABRE messages)

  async getEventConfirm() {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_GETEVENTCONFIRM_GET', {});
  }

  async getEventNotify() {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_GETEVENTNOTIFY_GET', {});
  }

  async getFootnotes() {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_GETFOOTNOTES_GET', {});
  }

  async getReactNotify() {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_GETREACTNOTIFY_GET', {});
  }

  async getOrgSearch() {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_ORGSEARCH_GET', {});
  }

  async getUserSearch() {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_USERSEARCH_GET', {});
  }

  // PUT procs - discrete parameters (not JSON wrappers)

  async sendReactionConfirmation(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_SENDREACTIONCONFIRMATION_PUT', {
      CAR_NAME_REPORTER: { type: sql.VarChar(256), value: params.CAR_NAME_REPORTER ?? null },
      CARREPORTEREMAIL: { type: sql.VarChar(256), value: params.CARREPORTEREMAIL ?? null },
      CARTELCONTACT: { type: sql.VarChar(256), value: params.CARTELCONTACT ?? null },
      CARPOSITION: { type: sql.VarChar(256), value: params.CARPOSITION ?? null },
      CARCONFIRMATIONDATE: { type: sql.VarChar(50), value: params.CARCONFIRMATIONDATE ?? null },
      CARREACTIONDATE: { type: sql.VarChar(50), value: params.CARREACTIONDATE ?? null },
      CARPRODUCT: { type: sql.VarChar(256), value: params.CARPRODUCT ?? null },
      CARPRODUCTOTHER: { type: sql.VarChar(256), value: params.CARPRODUCTOTHER ?? null },
      CARCONFIRMATION: { type: sql.VarChar(256), value: params.CARCONFIRMATION ?? null },
      CARCHANGEREACTIONTYPE: { type: sql.VarChar(256), value: params.CARCHANGEREACTIONTYPE ?? null },
      CARREACTIONTYPE: { type: sql.VarChar(256), value: params.CARREACTIONTYPE ?? null },
      CARREACTIONTYPEOTHER: { type: sql.VarChar(256), value: params.CARREACTIONTYPEOTHER ?? null },
      CARCLINICALOUTCOME: { type: sql.VarChar(256), value: params.CARCLINICALOUTCOME ?? null },
      CARIMPUTABILITY: { type: sql.VarChar(256), value: params.CARIMPUTABILITY ?? null },
      CARREPORT: { type: sql.VarChar(256), value: params.CARREPORT ?? null },
      SABREREFERENCENUMBER: { type: sql.VarChar(50), value: params.SABREREFERENCENUMBER ?? null },
    });
  }

  async sendUrlPacket(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_SENDURLPACKET_PUT', {
      URLLINK: { type: sql.NVarChar(sql.MAX), value: params.URLLINK ?? null },
      URLSABREREFERENCE: { type: sql.VarChar(50), value: params.URLSABREREFERENCE ?? null },
      URLQUESTSTATE: { type: sql.VarChar(50), value: params.URLQUESTSTATE ?? null },
    });
  }

  async confirmRead(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_CONFIRM_READ_PUT', {
      incidentIdsJson: { type: sql.VarChar(sql.MAX), value: params.incidentIdsJson ?? null },
      ORGSEARCH_READ: { type: sql.Bit(), value: params.ORGSEARCH_READ ?? null },
      USERSEARCH_READ: { type: sql.Bit(), value: params.USERSEARCH_READ ?? null },
      GETEVENTCONFIRM_READ: { type: sql.Bit(), value: params.GETEVENTCONFIRM_READ ?? null },
      GETEVENTNOTIFY_READ: { type: sql.Bit(), value: params.GETEVENTNOTIFY_READ ?? null },
      GETREACTNOTIFY_READ: { type: sql.Bit(), value: params.GETREACTNOTIFY_READ ?? null },
    });
  }

  async confirmFootnoteRead(footnoteIdsJson: string) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_CONFIRM_FOOTNOTE_READ_PUT', {
      footnoteIdsJson: { type: sql.VarChar(sql.MAX), value: footnoteIdsJson },
    });
  }

  async confirmReactionNotificationDocumentRead(footnoteIdsJson: string) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_CONFIRM_REACTION_NOTIFICATION_DOCUMENT_READ_PUT', {
      footnoteIdsJson: { type: sql.VarChar(sql.MAX), value: footnoteIdsJson },
    });
  }

  async confirmEventConfirmationDocumentRead(footnoteIdsJson: string) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_CONFIRM_EVENT_CONFIRMATION_DOCUMENT_READ_PUT', {
      footnoteIdsJson: { type: sql.VarChar(sql.MAX), value: footnoteIdsJson },
    });
  }

  async confirmEventNotificationDocumentRead(footnoteIdsJson: string) {
    return this.sqlServer.callProc('dbo.usp_API_HAEMO_SHOT_WSDL_CONFIRM_EVENT_NOTIFICATION_DOCUMENT_READ_PUT', {
      footnoteIdsJson: { type: sql.VarChar(sql.MAX), value: footnoteIdsJson },
    });
  }
}
