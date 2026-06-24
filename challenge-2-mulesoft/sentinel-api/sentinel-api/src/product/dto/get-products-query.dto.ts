import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumberString,
} from 'class-validator';

export class GetProductsQueryDto {
  @ApiPropertyOptional({ description: 'Organisation ID' })
  @IsOptional()
  @IsNumberString()
  organisationId?: string;

  @ApiPropertyOptional({ description: 'Device ID' })
  @IsOptional()
  @IsNumberString()
  deviceId?: string;

  @ApiPropertyOptional({ description: 'Start position for pagination' })
  @IsOptional()
  @IsNumberString()
  startPos?: string;

  @ApiPropertyOptional({ description: 'Number of rows to return' })
  @IsOptional()
  @IsNumberString()
  noOfRows?: string;

  @ApiPropertyOptional({ description: 'Field to sort by' })
  @IsOptional()
  @IsString()
  sortField?: string;

  @ApiPropertyOptional({ description: 'Sort ascending (true/false)' })
  @IsOptional()
  @IsString()
  isAscending?: string;
}
