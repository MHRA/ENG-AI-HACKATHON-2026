import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ description: 'Organisation ID', example: 12345 })
  @IsInt()
  @IsNotEmpty()
  organisationId!: number;

  @ApiProperty({ description: 'Address line 1', example: '10 Downing Street' })
  @IsString()
  @IsNotEmpty()
  addressLine1!: string;

  @ApiPropertyOptional({ description: 'Address line 2' })
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiPropertyOptional({ description: 'Address line 3' })
  @IsOptional()
  @IsString()
  addressLine3?: string;

  @ApiProperty({ description: 'City', example: 'London' })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiPropertyOptional({ description: 'County', example: 'Greater London' })
  @IsOptional()
  @IsString()
  county?: string;

  @ApiProperty({ description: 'Postcode', example: 'SW1A 2AA' })
  @IsString()
  @IsNotEmpty()
  postcode!: string;

  @ApiProperty({ description: 'Country', example: 'United Kingdom' })
  @IsString()
  @IsNotEmpty()
  country!: string;

  @ApiProperty({ description: 'Address type code', example: 'REGISTERED' })
  @IsString()
  @IsNotEmpty()
  addressTypeCode!: string;

  @ApiProperty({ description: 'Whether the address is active', example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive!: boolean;
}
