import { Injectable } from '@nestjs/common';
import { DeviceRepository } from './device.repository';

@Injectable()
export class DeviceService {
  constructor(private readonly repo: DeviceRepository) {}

  async addDevice(body: any) {
    const result = await this.repo.addDevice(body.organisationId, body.deviceJson, body.serviceId ?? 1, body.appUserName);
    return result.recordset?.[0] ?? { success: true };
  }

  async registerDevice(body: any) {
    const result = await this.repo.registerDevice(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async updateProductRegistration(body: any) {
    const result = await this.repo.updateProductRegistration(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async updateFurtherInfoRegistration(body: any) {
    const result = await this.repo.updateFurtherInfoRegistration(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async getCeCertificateExpiry(deviceIds: string) {
    const result = await this.repo.getCeCertificateExpiry(deviceIds);
    return result.recordset;
  }
}
