import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ApprovePaymentDto {
  @ApiProperty({ description: 'Payment approval data as JSON string' })
  @IsNotEmpty()
  @IsString()
  paymentApprovalJson: string;

  @ApiProperty({ description: 'Username performing the approval' })
  @IsNotEmpty()
  @IsString()
  userName: string;
}
