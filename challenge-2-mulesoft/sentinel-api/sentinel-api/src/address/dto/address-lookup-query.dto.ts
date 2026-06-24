import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddressLookupQueryDto {
  @ApiProperty({ description: 'Postcode to search', example: 'SW1A 2AA' })
  @IsString()
  @IsNotEmpty()
  postcode!: string;

  @ApiPropertyOptional({ description: 'House number or name to narrow the search', example: '10' })
  @IsOptional()
  @IsString()
  houseNumber?: string;
}
