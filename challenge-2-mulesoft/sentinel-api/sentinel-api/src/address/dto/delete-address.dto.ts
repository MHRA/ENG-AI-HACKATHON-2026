import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';

export class DeleteAddressDto {
  @ApiProperty({
    description: 'Array of address IDs to delete',
    example: [1001, 1002, 1003],
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  addressIds!: number[];
}
