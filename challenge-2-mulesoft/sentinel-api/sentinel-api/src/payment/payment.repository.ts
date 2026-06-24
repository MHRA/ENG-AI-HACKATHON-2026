import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';

@Injectable()
export class PaymentRepository {
  constructor(private readonly sqlServer: SqlServerService) {}

  async createPayment(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_PAYMENT_Post', {
      EVENT_VERSION_ID: { type: sql.Int(), value: params.eventVersionId ?? null },
      APPLICATION_PAYMENT_STATUS_ID: { type: sql.Int(), value: params.applicationPaymentStatusId ?? null },
      SERVICE_ID: { type: sql.Int(), value: params.serviceId ?? null },
      ACTIVITY_TYPE_ID: { type: sql.Int(), value: params.activityTypeId ?? null },
      ORGANISATION_ID: { type: sql.Int(), value: params.organisationId ?? null },
      APPIAN_REFERENCE_NUMBER: { type: sql.NVarChar(100), value: params.appianReferenceNumber ?? null },
      AMOUNT: { type: sql.Decimal(18, 2), value: params.amount ?? null },
      AUTHAMOUNT: { type: sql.Decimal(18, 2), value: params.authAmount ?? null },
      AUTHCOST: { type: sql.Decimal(18, 2), value: params.authCost ?? null },
      EMAIL: { type: sql.VarChar(256), value: params.email ?? null },
      ADD_ID_ONE: { type: sql.Int(), value: params.addIdOne ?? null },
      ADD_ID_TWO: { type: sql.Int(), value: params.addIdTwo ?? null },
      PAYMENT_METHOD_ID: { type: sql.SmallInt(), value: params.paymentMethodId ?? null },
      MERCHANT: { type: sql.NVarChar(256), value: params.merchant ?? null },
      CURRENCY: { type: sql.NVarChar(10), value: params.currency ?? null },
      PAYMENT_REFERENCE_NO: { type: sql.NVarChar(100), value: params.paymentReferenceNo ?? null },
      WORLDPAYTICKET: { type: sql.NVarChar(256), value: params.worldpayTicket ?? null },
      PAYMENT_STATUS_ID: { type: sql.SmallInt(), value: params.paymentStatusId ?? null },
      AUTHORISATIONID: { type: sql.Int(), value: params.authorisationId ?? null },
      CVCRESULTCODE: { type: sql.NVarChar(50), value: params.cvcResultCode ?? null },
      AVSRESULTCODE: { type: sql.NVarChar(50), value: params.avsResultCode ?? null },
      AAVADDRESSRESULTCODE: { type: sql.NVarChar(50), value: params.aavAddressResultCode ?? null },
      AAVPOSTCODERESULTCODE: { type: sql.NVarChar(50), value: params.aavPostcodeResultCode ?? null },
      AAVCARDHOLDERNAMERESULTCODE: { type: sql.NVarChar(50), value: params.aavCardholderNameResultCode ?? null },
      AAVTELEPHONERESULTCODE: { type: sql.NVarChar(50), value: params.aavTelephoneResultCode ?? null },
      AAVEMAILRESULTCODE: { type: sql.NVarChar(50), value: params.aavEmailResultCode ?? null },
      THREEDSECURERESULT: { type: sql.NVarChar(50), value: params.threeDSecureResult ?? null },
      CHARENC: { type: sql.VarChar(50), value: params.charEnc ?? null },
      IPADDRESS: { type: sql.VarChar(50), value: params.ipAddress ?? null },
      INSTALLATION: { type: sql.Int(), value: params.installation ?? null },
      INSTID: { type: sql.Int(), value: params.instId ?? null },
      PAYMENTDESC: { type: sql.VarChar(256), value: params.paymentDesc ?? null },
      COMPNAME: { type: sql.VarChar(256), value: params.compName ?? null },
      LANG: { type: sql.NVarChar(10), value: params.lang ?? null },
      CARDTYPE: { type: sql.VarChar(50), value: params.cardType ?? null },
      TESTMODE: { type: sql.Int(), value: params.testMode ?? null },
      CREATED_BY: { type: sql.Int(), value: params.createdBy ?? null },
      PAYMENTDOCJSON: { type: sql.NVarChar(sql.MAX), value: params.paymentDocJson ?? null },
    });
  }

  async approvePayment(params: any) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_BACSCHAPS_PAYMENT_APPROVAL_Put', {
      APPIAN_REFERENCE_NUMBER: { type: sql.NVarChar(100), value: params.appianReferenceNumber },
      PAYMENT_STATUS_ID: { type: sql.SmallInt(), value: params.paymentStatusId },
      APPROVAL_DATETIME: { type: sql.Date(), value: params.approvalDatetime },
      APPROVED_BY: { type: sql.VarChar(256), value: params.approvedBy },
      ACTIVITY_TYPE_ID: { type: sql.SmallInt(), value: params.activityTypeId ?? null },
      APP_REJECTION_REASON_ID: { type: sql.SmallInt(), value: params.appRejectionReasonId ?? null },
    });
  }
}
