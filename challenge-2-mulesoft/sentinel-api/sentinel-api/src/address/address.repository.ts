import { Injectable, Logger } from '@nestjs/common';
import * as sql from 'mssql';
import { SqlServerService } from '../database/sql-server.service';
import { ConfigService } from '@nestjs/config';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressRepository {
  private readonly logger = new Logger(AddressRepository.name);

  constructor(
    private readonly sqlServer: SqlServerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Get addresses by application reference number.
   * Calls: dbo.usp_API_Application_Address_Get
   */
  async getByApplicationRef(applicationRefNumber: string) {
    return this.sqlServer.callProc('dbo.usp_API_Application_Address_Get', {
      applicationReferenceNumber: {
        type: sql.VarChar(100),
        value: applicationRefNumber,
      },
    });
  }

  /**
   * Get previous addresses for an organisation.
   * Calls: dbo.usp_API_Organisation_Address_Previous_Get
   */
  async getPreviousAddresses(
    organisationId: number,
    applicationRefNumber: string,
  ) {
    return this.sqlServer.callProc(
      'dbo.usp_API_Organisation_Address_Previous_Get',
      {
        organisationId: { type: sql.Int(), value: organisationId },
        applicationReferenceNumber: {
          type: sql.VarChar(100),
          value: applicationRefNumber,
        },
      },
    );
  }

  /**
   * Get CFS application addresses.
   * Calls: dbo.usp_API_CFSApplication_Address_Get
   */
  async getCfsApplicationAddress(
    applicationRefNumber: string,
    cfsApplicationAddressType: string,
  ) {
    return this.sqlServer.callProc('dbo.usp_API_CFSApplication_Address_Get', {
      ApplicationReferenceNumber: {
        type: sql.VarChar(100),
        value: applicationRefNumber,
      },
      cfsApplicationAddressType: {
        type: sql.VarChar(50),
        value: cfsApplicationAddressType,
      },
    });
  }

  /**
   * Get organisation addresses with address type flags (default route).
   * Calls: dbo.usp_API_Organisation_Address_withAddTypeFlags_Get
   */
  async getOrganisationAddressesWithFlags(params: {
    organisationId: number | null;
    contactCategoryId?: string;
    addressId?: string;
    addressTypeCode?: string;
    isActive?: string;
  }) {
    return this.sqlServer.callProc(
      'dbo.usp_API_Organisation_Address_withAddTypeFlags_Get',
      {
        organisationId: { type: sql.Int(), value: params.organisationId ?? null },
        contactCategoryId: {
          type: sql.VarChar(50),
          value: params.contactCategoryId ?? null,
        },
        addressId: {
          type: sql.VarChar(50),
          value: params.addressId ?? null,
        },
        addressTypeCode: {
          type: sql.VarChar(50),
          value: params.addressTypeCode ?? null,
        },
        isActive: {
          type: sql.Bit(),
          value:
            params.isActive != null ? params.isActive === 'true' : null,
        },
      },
    );
  }

  /**
   * Validate user-organisation address for migration.
   * Calls: dbo.usp_API_Migration_UserOrganisation_Address_Validation_Check
   */
  async getAddressValidationCheck(
    userName: string,
    repOrganisationId: number,
  ) {
    return this.sqlServer.callProc(
      'dbo.usp_API_Migration_UserOrganisation_Address_Validation_Check',
      {
        userName: { type: sql.VarChar(256), value: userName },
        repOrganisationId: { type: sql.Int(), value: repOrganisationId },
      },
    );
  }

  /**
   * Check for duplicate addresses.
   * Calls: dbo.usp_API_CHECK_ADDR_DUPLICATE_Get
   */
  async checkDuplicateAddress(params: {
    organisationId?: number;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    city?: string;
    county?: string;
    postcode?: string;
    country?: string;
    addressTypeCode?: string;
  }) {
    return this.sqlServer.callProc('dbo.usp_API_CHECK_ADDR_DUPLICATE_Get', {
      organisationId: {
        type: sql.Int(),
        value: params.organisationId ?? null,
      },
      addressLine1: {
        type: sql.VarChar(256),
        value: params.addressLine1 ?? null,
      },
      addressLine2: {
        type: sql.VarChar(256),
        value: params.addressLine2 ?? null,
      },
      addressLine3: {
        type: sql.VarChar(256),
        value: params.addressLine3 ?? null,
      },
      city: { type: sql.VarChar(100), value: params.city ?? null },
      county: { type: sql.VarChar(100), value: params.county ?? null },
      postcode: { type: sql.VarChar(20), value: params.postcode ?? null },
      country: { type: sql.VarChar(100), value: params.country ?? null },
      addressTypeCode: {
        type: sql.VarChar(50),
        value: params.addressTypeCode ?? null,
      },
    });
  }

  /**
   * Insert a new address.
   * Calls: dbo.usp_API_ENC_MODULE_ADDR_Post
   */
  async createAddress(dto: CreateAddressDto) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_MODULE_ADDR_Post', {
      PARTY_ID: { type: sql.Int(), value: dto.organisationId },
      SERVICE_ID: { type: sql.SmallInt(), value: 1 },
      EVENT_VERSION_ID: { type: sql.Int(), value: 1 },
      ADDR_LINE_ONE: { type: sql.NVarChar(500), value: dto.addressLine1 },
      ADDR_LINE_TWO: { type: sql.NVarChar(500), value: dto.addressLine2 ?? null },
      ADDR_LINE_THREE: { type: sql.NVarChar(500), value: dto.addressLine3 ?? null },
      ADDR_LINE_FOUR: { type: sql.NVarChar(500), value: null },
      CITY: { type: sql.NVarChar(200), value: dto.city },
      STATE: { type: sql.NVarChar(200), value: null },
      COUNTY_STATE_PROVINCE: { type: sql.NVarChar(200), value: dto.county ?? null },
      REGION: { type: sql.NVarChar(200), value: null },
      POST_CODE: { type: sql.NVarChar(20), value: dto.postcode },
      COUNTRY_ID: { type: sql.SmallInt(), value: null },
      CONTACT_TYPE_ID: { type: sql.SmallInt(), value: null },
      USER_NAME: { type: sql.VarChar(100), value: null },
      ADDR_ID: { type: sql.Int(), value: null, output: true },
      STATUS: { type: sql.VarChar(50), value: null, output: true },
      Address_Type_Options: { type: sql.VarChar(sql.MAX), value: null },
      FROM_Date: { type: sql.DateTime(), value: null },
    });
  }

  /**
   * Update an existing address.
   * Calls: dbo.usp_API_ENC_MODULE_ADDR_Put
   */
  async updateAddress(addressId: number, dto: UpdateAddressDto) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_MODULE_ADDR_Put', {
      PARTY_ID: { type: sql.Int(), value: dto.organisationId ?? null },
      SERVICE_ID: { type: sql.SmallInt(), value: 1 },
      EVENT_VERSION_ID: { type: sql.Int(), value: 1 },
      ADDR_LINE_ONE: { type: sql.NVarChar(500), value: dto.addressLine1 ?? null },
      ADDR_LINE_TWO: { type: sql.NVarChar(500), value: dto.addressLine2 ?? null },
      ADDR_LINE_THREE: { type: sql.NVarChar(500), value: dto.addressLine3 ?? null },
      ADDR_LINE_FOUR: { type: sql.NVarChar(500), value: null },
      CITY: { type: sql.NVarChar(200), value: dto.city ?? null },
      STATE: { type: sql.NVarChar(200), value: null },
      COUNTY_STATE_PROVINCE: { type: sql.NVarChar(200), value: dto.county ?? null },
      REGION: { type: sql.NVarChar(200), value: null },
      POST_CODE: { type: sql.NVarChar(20), value: dto.postcode ?? null },
      COUNTRY_ID: { type: sql.SmallInt(), value: null },
      CONTACT_TYPE_ID: { type: sql.SmallInt(), value: null },
      USER_NAME: { type: sql.VarChar(100), value: null },
      ADDR_ID: { type: sql.Int(), value: addressId },
      STATUS: { type: sql.VarChar(50), value: null, output: true },
      Address_Type_Options: { type: sql.VarChar(sql.MAX), value: null },
      NewAddressId: { type: sql.Int(), value: null, output: true },
    });
  }

  /**
   * Delete addresses by organisation and address list.
   * Calls: dbo.usp_API_ENC_MODULE_ADDR_Delete
   */
  async deleteAddress(addressId: number) {
    return this.sqlServer.callProc('dbo.usp_API_ENC_MODULE_ADDR_Delete', {
      Organisation_ID: { type: sql.Int(), value: null },
      RemoveAddrList_JSON: {
        type: sql.NVarChar(sql.MAX),
        value: JSON.stringify({ RemoveAddressList: [{ AddressId: addressId }] }),
      },
      Status: { type: sql.VarChar(50), value: null, output: true },
    });
  }

  /**
   * Lookup addresses via GBG/Loqate external API.
   */
  async lookupAddress(postcode: string, houseNumber?: string) {
    const apiKey = this.configService.getOrThrow<string>('GBG_API_KEY');
    const baseUrl = 'https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws';

    const params = new URLSearchParams({
      Key: apiKey,
      Text: houseNumber ? `${houseNumber} ${postcode}` : postcode,
      Countries: 'GB',
      Limit: '20',
    });

    const url = `${baseUrl}?${params.toString()}`;

    this.logger.debug(`GBG/Loqate lookup: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `GBG/Loqate API returned ${response.status}: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  }
}
