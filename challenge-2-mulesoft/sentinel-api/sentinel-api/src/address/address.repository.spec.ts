import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AddressRepository } from './address.repository';
import { SqlServerService } from '../database/sql-server.service';

describe('AddressRepository', () => {
  let repository: AddressRepository;
  let sqlServer: jest.Mocked<SqlServerService>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const mockSqlServer = {
      callProc: jest.fn().mockResolvedValue({ recordset: [] }),
    };

    const mockConfigService = {
      get: jest.fn(),
      getOrThrow: jest.fn().mockReturnValue('test-key'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressRepository,
        { provide: SqlServerService, useValue: mockSqlServer },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    repository = module.get<AddressRepository>(AddressRepository);
    sqlServer = module.get(SqlServerService);
    configService = module.get(ConfigService);
  });

  describe('getByApplicationRef', () => {
    it('should call the correct stored procedure with applicationReferenceNumber param', async () => {
      await repository.getByApplicationRef('APP-001');

      expect(sqlServer.callProc).toHaveBeenCalledWith(
        'dbo.usp_API_Application_Address_Get',
        {
          applicationReferenceNumber: {
            type: expect.anything(),
            value: 'APP-001',
          },
        },
      );
    });
  });

  describe('getPreviousAddresses', () => {
    it('should call the correct stored procedure with organisationId and applicationRefNumber', async () => {
      await repository.getPreviousAddresses(1742, 'APP-001');

      expect(sqlServer.callProc).toHaveBeenCalledWith(
        'dbo.usp_API_Organisation_Address_Previous_Get',
        {
          organisationId: { type: expect.anything(), value: 1742 },
          applicationReferenceNumber: {
            type: expect.anything(),
            value: 'APP-001',
          },
        },
      );
    });
  });

  describe('getCfsApplicationAddress', () => {
    it('should call the correct stored procedure with ApplicationReferenceNumber and cfsApplicationAddressType', async () => {
      await repository.getCfsApplicationAddress('APP-001', 'CFS_BILLING');

      expect(sqlServer.callProc).toHaveBeenCalledWith(
        'dbo.usp_API_CFSApplication_Address_Get',
        {
          ApplicationReferenceNumber: {
            type: expect.anything(),
            value: 'APP-001',
          },
          cfsApplicationAddressType: {
            type: expect.anything(),
            value: 'CFS_BILLING',
          },
        },
      );
    });
  });

  describe('getOrganisationAddressesWithFlags', () => {
    it('should call the correct stored procedure with organisationId', async () => {
      await repository.getOrganisationAddressesWithFlags({
        organisationId: 1742,
      });

      expect(sqlServer.callProc).toHaveBeenCalledWith(
        'dbo.usp_API_Organisation_Address_withAddTypeFlags_Get',
        {
          organisationId: { type: expect.anything(), value: 1742 },
          contactCategoryId: { type: expect.anything(), value: null },
          addressId: { type: expect.anything(), value: null },
          addressTypeCode: { type: expect.anything(), value: null },
          isActive: { type: expect.anything(), value: null },
        },
      );
    });

    it('should pass optional params when provided', async () => {
      await repository.getOrganisationAddressesWithFlags({
        organisationId: 1742,
        contactCategoryId: '5',
        addressId: '100',
        addressTypeCode: 'REGISTERED',
        isActive: 'true',
      });

      expect(sqlServer.callProc).toHaveBeenCalledWith(
        'dbo.usp_API_Organisation_Address_withAddTypeFlags_Get',
        {
          organisationId: { type: expect.anything(), value: 1742 },
          contactCategoryId: { type: expect.anything(), value: '5' },
          addressId: { type: expect.anything(), value: '100' },
          addressTypeCode: { type: expect.anything(), value: 'REGISTERED' },
          isActive: { type: expect.anything(), value: true },
        },
      );
    });
  });

  describe('getAddressValidationCheck', () => {
    it('should call the correct stored procedure with userName and repOrganisationId', async () => {
      await repository.getAddressValidationCheck('user1', 1742);

      expect(sqlServer.callProc).toHaveBeenCalledWith(
        'dbo.usp_API_Migration_UserOrganisation_Address_Validation_Check',
        {
          userName: { type: expect.anything(), value: 'user1' },
          repOrganisationId: { type: expect.anything(), value: 1742 },
        },
      );
    });
  });

  describe('checkDuplicateAddress', () => {
    it('should call the correct stored procedure with address params', async () => {
      await repository.checkDuplicateAddress({
        organisationId: 1742,
        addressLine1: 'test',
      });

      expect(sqlServer.callProc).toHaveBeenCalledWith(
        'dbo.usp_API_CHECK_ADDR_DUPLICATE_Get',
        {
          organisationId: { type: expect.anything(), value: 1742 },
          addressLine1: { type: expect.anything(), value: 'test' },
          addressLine2: { type: expect.anything(), value: null },
          addressLine3: { type: expect.anything(), value: null },
          city: { type: expect.anything(), value: null },
          county: { type: expect.anything(), value: null },
          postcode: { type: expect.anything(), value: null },
          country: { type: expect.anything(), value: null },
          addressTypeCode: { type: expect.anything(), value: null },
        },
      );
    });
  });

  describe('createAddress', () => {
    it('should call dbo.usp_API_ENC_MODULE_ADDR_Post with correct params', async () => {
      const dto = {
        organisationId: 12345,
        addressLine1: '10 Downing Street',
        addressLine2: undefined,
        addressLine3: undefined,
        city: 'London',
        county: undefined,
        postcode: 'SW1A 2AA',
        country: 'United Kingdom',
        addressTypeCode: 'REGISTERED',
        isActive: true,
      };

      await repository.createAddress(dto as any);

      expect(sqlServer.callProc).toHaveBeenCalledWith(
        'dbo.usp_API_ENC_MODULE_ADDR_Post',
        expect.objectContaining({
          PARTY_ID: { type: expect.anything(), value: 12345 },
          ADDR_LINE_ONE: { type: expect.anything(), value: '10 Downing Street' },
          CITY: { type: expect.anything(), value: 'London' },
          POST_CODE: { type: expect.anything(), value: 'SW1A 2AA' },
        }),
      );
    });
  });

  describe('updateAddress', () => {
    it('should call dbo.usp_API_ENC_MODULE_ADDR_Put with addressId and dto params', async () => {
      const dto = {
        addressLine1: '11 Downing Street',
      };

      await repository.updateAddress(1, dto as any);

      expect(sqlServer.callProc).toHaveBeenCalledWith(
        'dbo.usp_API_ENC_MODULE_ADDR_Put',
        expect.objectContaining({
          ADDR_ID: { type: expect.anything(), value: 1 },
          ADDR_LINE_ONE: { type: expect.anything(), value: '11 Downing Street' },
        }),
      );
    });
  });

  describe('deleteAddress', () => {
    it('should call dbo.usp_API_ENC_MODULE_ADDR_Delete with addressId in JSON', async () => {
      await repository.deleteAddress(1);

      expect(sqlServer.callProc).toHaveBeenCalledWith(
        'dbo.usp_API_ENC_MODULE_ADDR_Delete',
        {
          Organisation_ID: { type: expect.anything(), value: null },
          RemoveAddrList_JSON: {
            type: expect.anything(),
            value: JSON.stringify({ RemoveAddressList: [{ AddressId: 1 }] }),
          },
          Status: { type: expect.anything(), value: null, output: true },
        },
      );
    });
  });

  describe('lookupAddress', () => {
    let mockFetch: jest.SpyInstance;

    beforeEach(() => {
      mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ Items: [{ Text: '10 Downing Street' }] }),
      } as unknown as Response);
    });

    afterEach(() => {
      mockFetch.mockRestore();
    });

    it('should call fetch with postcode only', async () => {
      await repository.lookupAddress('SW1A 2AA');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('SW1A+2AA'),
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('Key=test-key'),
      );
    });

    it('should call fetch with houseNumber and postcode', async () => {
      await repository.lookupAddress('SW1A 2AA', '10');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('10+SW1A+2AA'),
      );
    });

    it('should throw when fetch returns non-ok response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as unknown as Response);

      await expect(repository.lookupAddress('SW1A 2AA')).rejects.toThrow(
        'GBG/Loqate API returned 500: Internal Server Error',
      );
    });
  });
});
