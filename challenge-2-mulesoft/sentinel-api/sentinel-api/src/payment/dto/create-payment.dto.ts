import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Payment data as JSON string' })
  @IsNotEmpty()
  @IsString()
  paymentJson: string;

  @ApiProperty({ description: 'Username performing the action' })
  @IsNotEmpty()
  @IsString()
  userName: string;
}
