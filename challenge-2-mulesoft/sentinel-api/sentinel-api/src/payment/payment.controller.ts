import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(ApiKeyGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a payment' })
  @ApiResponse({ status: 201, description: 'Payment created' })
  async createPayment(@Body() body: any) {
    return this.paymentService.createPayment(body);
  }

  @Put('approval')
  @ApiOperation({ summary: 'Approve a BACS/CHAPS payment' })
  @ApiResponse({ status: 200, description: 'Payment approved' })
  async approvePayment(@Body() body: any) {
    return this.paymentService.approvePayment(body);
  }
}
