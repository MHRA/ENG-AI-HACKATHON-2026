import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBooleanString,
  IsNumberString,
} from 'class-validator';

export class GetAddressesQueryDto {
  @ApiPropertyOptional({ description: 'Flag to indicate CFS application address request' })
  @IsOptional()
  @IsBooleanString()
  isCfs?: string;

  @ApiPropertyOptional({ description: 'Flag to indicate previous address request' })
  @IsOptional()
  @IsBooleanString()
  isPreviousAddress?: string;

  @ApiPropertyOptional({ description: 'Application reference number' })
  @IsOptional()
  @IsString()
  applicationRefNumber?: string;

  @ApiPropertyOptional({ description: 'Flag to indicate address validation check request' })
  @IsOptional()
  @IsBooleanString()
  isAddressRequestForValidation?: string;

  @ApiPropertyOptional({ description: 'Flag to indicate duplicate address check request' })
  @IsOptional()
  @IsBooleanString()
  isExists?: string;

  @ApiPropertyOptional({ description: 'Organisation ID' })
  @IsOptional()
  @IsNumberString()
  organisationId?: string;

  @ApiPropertyOptional({ description: 'Contact category ID' })
  @IsOptional()
  @IsString()
  contactCategoryId?: string;

  @ApiPropertyOptional({ description: 'Address ID' })
  @IsOptional()
  @IsString()
  addressId?: string;

  @ApiPropertyOptional({ description: 'Address type code' })
  @IsOptional()
  @IsString()
  addressTypeCode?: string;

  @ApiPropertyOptional({ description: 'Active status flag (0 or 1)' })
  @IsOptional()
  @IsBooleanString()
  isActive?: string;

  @ApiPropertyOptional({ description: 'Username for migration validation check' })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiPropertyOptional({ description: 'Representative organisation ID for migration validation' })
  @IsOptional()
  @IsNumberString()
  repOrganisationId?: string;

  @ApiPropertyOptional({ description: 'CFS application address type' })
  @IsOptional()
  @IsString()
  cfsApplicationAddressType?: string;

  @ApiPropertyOptional({ description: 'Address line 1 (for duplicate check)' })
  @IsOptional()
  @IsString()
  addressLine1?: string;

  @ApiPropertyOptional({ description: 'Address line 2 (for duplicate check)' })
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiPropertyOptional({ description: 'Address line 3 (for duplicate check)' })
  @IsOptional()
  @IsString()
  addressLine3?: string;

  @ApiPropertyOptional({ description: 'City (for duplicate check)' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'County (for duplicate check)' })
  @IsOptional()
  @IsString()
  county?: string;

  @ApiPropertyOptional({ description: 'Postcode (for duplicate check)' })
  @IsOptional()
  @IsString()
  postcode?: string;

  @ApiPropertyOptional({ description: 'Country (for duplicate check)' })
  @IsOptional()
  @IsString()
  country?: string;
}
