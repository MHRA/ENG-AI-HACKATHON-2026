import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { AddressService } from './address.service';
import { GetAddressesQueryDto } from './dto/get-addresses-query.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { DeleteAddressDto } from './dto/delete-address.dto';
import { AddressResponseDto } from './dto/address-response.dto';
import { AddressLookupQueryDto } from './dto/address-lookup-query.dto';

@ApiTags('Addresses')
@Controller('addresses')
@UseGuards(ApiKeyGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @ApiOperation({
    summary: 'Get addresses',
    description:
      'Retrieves addresses based on query parameters. Routes to different stored procedures depending on the combination of parameters provided.',
  })
  @ApiResponse({
    status: 200,
    description: 'Addresses retrieved successfully',
    type: [AddressResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid API key' })
  async getAddresses(@Query() query: GetAddressesQueryDto) {
    return this.addressService.getAddresses(query);
  }

  @Get('lookup')
  @ApiOperation({
    summary: 'Lookup address via GBG/Loqate',
    description:
      'Performs an external address lookup using the GBG/Loqate Capture API by postcode and optional house number.',
  })
  @ApiResponse({
    status: 200,
    description: 'Address lookup results returned',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid API key' })
  async lookupAddress(@Query() query: AddressLookupQueryDto) {
    return this.addressService.lookupAddress(query.postcode, query.houseNumber);
  }

  @Get(':addressId')
  @ApiOperation({
    summary: 'Get a single address by ID',
    description: 'Retrieves a single address record by its unique identifier.',
  })
  @ApiParam({ name: 'addressId', type: Number, description: 'The address ID' })
  @ApiResponse({
    status: 200,
    description: 'Address retrieved successfully',
    type: AddressResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid API key' })
  async getAddressById(@Param('addressId', ParseIntPipe) addressId: number) {
    return this.addressService.getAddressById(addressId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new address',
    description: 'Creates a new address record via the Address Insert stored procedure.',
  })
  @ApiResponse({
    status: 201,
    description: 'Address created successfully',
    type: AddressResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid API key' })
  async createAddress(@Body() dto: CreateAddressDto) {
    return this.addressService.createAddress(dto);
  }

  @Put(':addressId')
  @ApiOperation({
    summary: 'Update an existing address',
    description: 'Updates an existing address record via the Address Update stored procedure.',
  })
  @ApiParam({ name: 'addressId', type: Number, description: 'The address ID to update' })
  @ApiResponse({
    status: 200,
    description: 'Address updated successfully',
    type: AddressResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 404, description: 'Address not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid API key' })
  async updateAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(addressId, dto);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete addresses',
    description: 'Bulk deletes addresses by providing an array of address IDs in the request body.',
  })
  @ApiResponse({
    status: 200,
    description: 'Addresses deleted successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid API key' })
  async deleteAddresses(@Body() dto: DeleteAddressDto) {
    return this.addressService.deleteAddresses(dto.addressIds);
  }
}
