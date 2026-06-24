import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressRepository } from './address.repository';

describe('AddressService', () => {
  let service: AddressService;
  let repository: jest.Mocked<AddressRepository>;

  const mockResult = { recordset: [{ addressId: 1 }] };

  beforeEach(async () => {
    const mockRepository = {
      getCfsApplicationAddress: jest.fn().mockResolvedValue(mockResult),
      getPreviousAddresses: jest.fn().mockResolvedValue(mockResult),
      getByApplicationRef: jest.fn().mockResolvedValue(mockResult),
      getAddressValidationCheck: jest.fn().mockResolvedValue(mockResult),
      checkDuplicateAddress: jest.fn().mockResolvedValue(mockResult),
      getOrganisationAddressesWithFlags: jest.fn().mockResolvedValue(mockResult),
      createAddress: jest.fn().mockResolvedValue(mockResult),
      updateAddress: jest.fn().mockResolvedValue(mockResult),
      deleteAddress: jest.fn().mockResolvedValue(mockResult),
      lookupAddress: jest.fn().mockResolvedValue({ Items: [] }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        { provide: AddressRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repository = module.get(AddressRepository);
  });

  describe('getAddresses', () => {
    it('should route to CFS application address when isCfs is true', async () => {
      const query = {
        isCfs: 'true',
        applicationRefNumber: 'APP-001',
        cfsApplicationAddressType: 'CFS_BILLING',
      };

      const result = await service.getAddresses(query as any);

      expect(repository.getCfsApplicationAddress).toHaveBeenCalledWith(
        'APP-001',
        'CFS_BILLING',
      );
      expect(result).toEqual(mockResult.recordset);
    });

    it('should route to previous addresses when isPreviousAddress is true', async () => {
      const query = {
        isPreviousAddress: 'true',
        organisationId: '1742',
        applicationRefNumber: 'APP-001',
      };

      const result = await service.getAddresses(query as any);

      expect(repository.getPreviousAddresses).toHaveBeenCalledWith(
        1742,
        'APP-001',
      );
      expect(result).toEqual(mockResult.recordset);
    });

    it('should route to application address when applicationRefNumber is present', async () => {
      const query = {
        applicationRefNumber: 'APP-001',
      };

      const result = await service.getAddresses(query as any);

      expect(repository.getByApplicationRef).toHaveBeenCalledWith('APP-001');
      expect(result).toEqual(mockResult.recordset);
    });

    it('should route to validation check when isAddressRequestForValidation is true', async () => {
      const query = {
        isAddressRequestForValidation: 'true',
        userName: 'user1',
        repOrganisationId: '1742',
      };

      const result = await service.getAddresses(query as any);

      expect(repository.getAddressValidationCheck).toHaveBeenCalledWith(
        'user1',
        1742,
      );
      expect(result).toEqual(mockResult.recordset);
    });

    it('should route to duplicate check when isExists is true', async () => {
      const query = {
        isExists: 'true',
        organisationId: '1742',
        addressLine1: '10 Downing Street',
        city: 'London',
        postcode: 'SW1A 2AA',
        country: 'United Kingdom',
        addressTypeCode: 'REGISTERED',
      };

      const result = await service.getAddresses(query as any);

      expect(repository.checkDuplicateAddress).toHaveBeenCalledWith({
        organisationId: 1742,
        addressLine1: '10 Downing Street',
        addressLine2: undefined,
        addressLine3: undefined,
        city: 'London',
        county: undefined,
        postcode: 'SW1A 2AA',
        country: 'United Kingdom',
        addressTypeCode: 'REGISTERED',
      });
      expect(result).toEqual(mockResult.recordset);
    });

    it('should route to default organisation addresses when no special flags are set', async () => {
      const query = {
        organisationId: '1742',
        contactCategoryId: '5',
        isActive: 'true',
      };

      const result = await service.getAddresses(query as any);

      expect(repository.getOrganisationAddressesWithFlags).toHaveBeenCalledWith({
        organisationId: 1742,
        contactCategoryId: '5',
        addressId: undefined,
        addressTypeCode: undefined,
        isActive: 'true',
      });
      expect(result).toEqual(mockResult.recordset);
    });

    it('should respect routing priority (isCfs takes precedence over applicationRefNumber)', async () => {
      const query = {
        isCfs: 'true',
        applicationRefNumber: 'APP-001',
        cfsApplicationAddressType: 'CFS_BILLING',
        isPreviousAddress: 'true',
      };

      await service.getAddresses(query as any);

      expect(repository.getCfsApplicationAddress).toHaveBeenCalled();
      expect(repository.getPreviousAddresses).not.toHaveBeenCalled();
      expect(repository.getByApplicationRef).not.toHaveBeenCalled();
    });
  });

  describe('getAddressById', () => {
    it('should return the first address when found', async () => {
      const result = await service.getAddressById(1);

      expect(repository.getOrganisationAddressesWithFlags).toHaveBeenCalledWith({
        organisationId: null,
        addressId: '1',
      });
      expect(result).toEqual({ addressId: 1 });
    });

    it('should throw NotFoundException when no address is found', async () => {
      repository.getOrganisationAddressesWithFlags.mockResolvedValue({
        recordset: [],
      } as any);

      await expect(service.getAddressById(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createAddress', () => {
    it('should call repository.createAddress with the dto', async () => {
      const dto = {
        organisationId: 12345,
        addressLine1: '10 Downing Street',
        city: 'London',
        postcode: 'SW1A 2AA',
        country: 'United Kingdom',
        addressTypeCode: 'REGISTERED',
        isActive: true,
      };

      await service.createAddress(dto as any);

      expect(repository.createAddress).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateAddress', () => {
    it('should call repository.updateAddress with id and dto', async () => {
      const dto = {
        addressLine1: '11 Downing Street',
      };

      await service.updateAddress(1, dto as any);

      expect(repository.updateAddress).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('deleteAddresses', () => {
    it('should call repository.deleteAddress for each id', async () => {
      const result = await service.deleteAddresses([1, 2, 3]);

      expect(repository.deleteAddress).toHaveBeenCalledTimes(3);
      expect(repository.deleteAddress).toHaveBeenCalledWith(1);
      expect(repository.deleteAddress).toHaveBeenCalledWith(2);
      expect(repository.deleteAddress).toHaveBeenCalledWith(3);
      expect(result).toEqual({ deleted: 3, addressIds: [1, 2, 3] });
    });
  });

  describe('lookupAddress', () => {
    it('should call repository.lookupAddress with postcode and houseNumber', async () => {
      await service.lookupAddress('SW1A 2AA', '10');

      expect(repository.lookupAddress).toHaveBeenCalledWith('SW1A 2AA', '10');
    });

    it('should call repository.lookupAddress with postcode only', async () => {
      await service.lookupAddress('SW1A 2AA');

      expect(repository.lookupAddress).toHaveBeenCalledWith(
        'SW1A 2AA',
        undefined,
      );
    });
  });
});
