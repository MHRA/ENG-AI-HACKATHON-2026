import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { GetAddressesQueryDto } from './dto/get-addresses-query.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  private readonly logger = new Logger(AddressService.name);

  constructor(private readonly addressRepository: AddressRepository) {}

  /**
   * Route the GET /addresses request to the correct stored procedure
   * based on the query parameters provided.
   *
   * Routing priority (from MuleSoft DataWeave):
   * 1. isCfs === 'true' -> CFS Application Address
   * 2. isPreviousAddress === 'true' -> Previous Organisation Address
   * 3. applicationRefNumber present -> Application Address
   * 4. isAddressRequestForValidation === 'true' -> Migration Validation Check
   * 5. isExists === 'true' -> Duplicate Address Check
   * 6. Default -> Organisation Address with Type Flags
   */
  async getAddresses(query: GetAddressesQueryDto) {
    // Route 1: CFS Application Address
    if (query.isCfs === 'true') {
      this.logger.debug('Routing to CFS Application Address');
      const result = await this.addressRepository.getCfsApplicationAddress(
        query.applicationRefNumber!,
        query.cfsApplicationAddressType!,
      );
      return result.recordset;
    }

    // Route 2: Previous Organisation Address
    if (query.isPreviousAddress === 'true') {
      this.logger.debug('Routing to Previous Organisation Address');
      const result = await this.addressRepository.getPreviousAddresses(
        Number(query.organisationId),
        query.applicationRefNumber!,
      );
      return result.recordset;
    }

    // Route 3: Application Address (by reference number)
    if (query.applicationRefNumber) {
      this.logger.debug('Routing to Application Address');
      const result = await this.addressRepository.getByApplicationRef(
        query.applicationRefNumber,
      );
      return result.recordset;
    }

    // Route 4: Migration Validation Check
    if (query.isAddressRequestForValidation === 'true') {
      this.logger.debug('Routing to Migration Validation Check');
      const result = await this.addressRepository.getAddressValidationCheck(
        query.userName!,
        Number(query.repOrganisationId),
      );
      return result.recordset;
    }

    // Route 5: Duplicate Address Check
    if (query.isExists === 'true') {
      this.logger.debug('Routing to Duplicate Address Check');
      const result = await this.addressRepository.checkDuplicateAddress({
        organisationId: query.organisationId
          ? Number(query.organisationId)
          : undefined,
        addressLine1: query.addressLine1,
        addressLine2: query.addressLine2,
        addressLine3: query.addressLine3,
        city: query.city,
        county: query.county,
        postcode: query.postcode,
        country: query.country,
        addressTypeCode: query.addressTypeCode,
      });
      return result.recordset;
    }

    // Route 6 (Default): Organisation Address with Type Flags
    this.logger.debug('Routing to Organisation Address with Type Flags (default)');
    const result =
      await this.addressRepository.getOrganisationAddressesWithFlags({
        organisationId: Number(query.organisationId),
        contactCategoryId: query.contactCategoryId,
        addressId: query.addressId,
        addressTypeCode: query.addressTypeCode,
        isActive: query.isActive,
      });
    return result.recordset;
  }

  /**
   * Get a single address by ID.
   * Uses the default Organisation Address proc with addressId filter.
   */
  async getAddressById(addressId: number) {
    const result =
      await this.addressRepository.getOrganisationAddressesWithFlags({
        organisationId: null,
        addressId: String(addressId),
      });

    if (!result.recordset || result.recordset.length === 0) {
      throw new NotFoundException(`Address with ID ${addressId} not found`);
    }

    return result.recordset[0];
  }

  /**
   * Create a new address.
   */
  async createAddress(dto: CreateAddressDto) {
    const result = await this.addressRepository.createAddress(dto);
    return result.recordset?.[0] ?? { success: true };
  }

  /**
   * Update an existing address.
   */
  async updateAddress(addressId: number, dto: UpdateAddressDto) {
    const result = await this.addressRepository.updateAddress(addressId, dto);
    return result.recordset?.[0] ?? { success: true };
  }

  /**
   * Delete multiple addresses by their IDs.
   */
  async deleteAddresses(addressIds: number[]) {
    const results = await Promise.all(
      addressIds.map((id) => this.addressRepository.deleteAddress(id)),
    );
    return {
      deleted: addressIds.length,
      addressIds,
    };
  }

  /**
   * Lookup addresses via GBG/Loqate API.
   */
  async lookupAddress(postcode: string, houseNumber?: string) {
    return this.addressRepository.lookupAddress(postcode, houseNumber);
  }
}
