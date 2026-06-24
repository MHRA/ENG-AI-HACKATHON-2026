import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressResponseDto {
  @ApiProperty({ description: 'Address ID', example: 1001 })
  addressId!: number;

  @ApiProperty({ description: 'Organisation ID', example: 12345 })
  organisationId!: number;

  @ApiProperty({ description: 'Address line 1', example: '10 Downing Street' })
  addressLine1!: string;

  @ApiPropertyOptional({ description: 'Address line 2' })
  addressLine2?: string;

  @ApiPropertyOptional({ description: 'Address line 3' })
  addressLine3?: string;

  @ApiProperty({ description: 'City', example: 'London' })
  city!: string;

  @ApiPropertyOptional({ description: 'County', example: 'Greater London' })
  county?: string;

  @ApiProperty({ description: 'Postcode', example: 'SW1A 2AA' })
  postcode!: string;

  @ApiProperty({ description: 'Country', example: 'United Kingdom' })
  country!: string;

  @ApiProperty({ description: 'Address type code', example: 'REGISTERED' })
  addressTypeCode!: string;

  @ApiProperty({ description: 'Whether the address is active', example: true })
  isActive!: boolean;

  @ApiProperty({ description: 'Date the address was created', example: '2024-01-15T10:30:00.000Z' })
  createdDate!: string;

  @ApiPropertyOptional({ description: 'Date the address was last modified', example: '2024-06-01T14:00:00.000Z' })
  modifiedDate?: string;
}
