import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAccountService } from './user-account.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('User Accounts')
@Controller('user-accounts')
@UseGuards(ApiKeyGuard)
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Get('permissions')
  @ApiOperation({ summary: 'Get user permissions' })
  @ApiResponse({ status: 200, description: 'Permissions retrieved' })
  async getPermissions(@Query() query: any) {
    return this.userAccountService.getPermissions(query);
  }

  @Put('permissions')
  @ApiOperation({ summary: 'Update permission status' })
  @ApiResponse({ status: 200, description: 'Permission updated' })
  async updatePermission(@Body() body: { userName: string }) {
    return this.userAccountService.updatePermissionStatus(body.userName);
  }

  @Get('broadcasts')
  @ApiOperation({ summary: 'Get system broadcast messages' })
  @ApiResponse({ status: 200, description: 'Broadcasts retrieved' })
  async getBroadcasts(@Query() query: any) {
    return this.userAccountService.getBroadcasts(query);
  }

  @Post('broadcasts')
  @ApiOperation({ summary: 'Create a broadcast message' })
  @ApiResponse({ status: 201, description: 'Broadcast created' })
  async createBroadcast(@Body() body: any) {
    return this.userAccountService.createBroadcast(body);
  }

  @Put('broadcasts')
  @ApiOperation({ summary: 'Update a broadcast message' })
  @ApiResponse({ status: 200, description: 'Broadcast updated' })
  async updateBroadcast(@Body() body: any) {
    return this.userAccountService.updateBroadcast(body);
  }

  @Post('broadcasts/view')
  @ApiOperation({ summary: 'Mark broadcast as viewed' })
  @ApiResponse({ status: 201, description: 'Broadcast marked as viewed' })
  async markViewed(@Body() body: any) {
    return this.userAccountService.markBroadcastViewed(body);
  }

  @Post('service-permission')
  @ApiOperation({ summary: 'Add service permission' })
  @ApiResponse({ status: 201, description: 'Service permission added' })
  async addServicePermission(@Body() body: any) {
    return this.userAccountService.addServicePermission(body);
  }
}
