import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeviceService } from './device.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Devices')
@Controller('devices')
@UseGuards(ApiKeyGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: 'Add a device' })
  @ApiResponse({ status: 201, description: 'Device added' })
  async addDevice(@Body() body: any) {
    return this.deviceService.addDevice(body);
  }

  @Post('registration')
  @ApiOperation({ summary: 'Register a device' })
  @ApiResponse({ status: 201, description: 'Device registered' })
  async registerDevice(@Body() body: any) {
    return this.deviceService.registerDevice(body);
  }

  @Put('registration')
  @ApiOperation({ summary: 'Update device product registration' })
  @ApiResponse({ status: 200, description: 'Registration updated' })
  async updateProductRegistration(@Body() body: any) {
    return this.deviceService.updateProductRegistration(body);
  }

  @Put('further-info')
  @ApiOperation({ summary: 'Update device further info registration' })
  @ApiResponse({ status: 200, description: 'Further info updated' })
  async updateFurtherInfo(@Body() body: any) {
    return this.deviceService.updateFurtherInfoRegistration(body);
  }

  @Get('certificates')
  @ApiOperation({ summary: 'Get CE certificate expiry dates' })
  @ApiResponse({ status: 200, description: 'Certificate expiry dates retrieved' })
  async getCeCertificates(@Query('deviceIds') deviceIds: string) {
    return this.deviceService.getCeCertificateExpiry(deviceIds);
  }
}
