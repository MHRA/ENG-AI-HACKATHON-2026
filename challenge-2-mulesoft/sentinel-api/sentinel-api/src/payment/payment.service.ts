import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async createPayment(body: any) {
    const result = await this.paymentRepository.createPayment(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async approvePayment(body: any) {
    const result = await this.paymentRepository.approvePayment(body);
    return result.recordset?.[0] ?? { success: true };
  }
}
