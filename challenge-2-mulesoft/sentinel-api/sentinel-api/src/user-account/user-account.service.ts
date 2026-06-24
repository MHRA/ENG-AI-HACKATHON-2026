import { Injectable } from '@nestjs/common';
import { UserAccountRepository } from './user-account.repository';

@Injectable()
export class UserAccountService {
  constructor(private readonly repo: UserAccountRepository) {}

  async getPermissions(query: any) {
    const result = await this.repo.getUserPermissions(query);
    return result.recordset;
  }

  async updatePermissionStatus(userName: string) {
    const result = await this.repo.updatePermissionStatus(userName);
    return result.recordset?.[0] ?? { success: true };
  }

  async getBroadcasts(query: any) {
    const result = await this.repo.getBroadcasts(query);
    return result.recordset;
  }

  async createBroadcast(body: any) {
    const result = await this.repo.createBroadcast(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async updateBroadcast(body: any) {
    const result = await this.repo.updateBroadcast(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async markBroadcastViewed(body: any) {
    const result = await this.repo.markBroadcastViewed(body);
    return result.recordset?.[0] ?? { success: true };
  }

  async addServicePermission(body: any) {
    const result = await this.repo.addServicePermission(body);
    return result.recordset?.[0] ?? { success: true };
  }
}
