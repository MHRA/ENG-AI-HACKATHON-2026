import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Applications')
@Controller('applications')
@UseGuards(ApiKeyGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @ApiOperation({ summary: 'List or search applications' })
  @ApiResponse({ status: 200, description: 'Applications retrieved' })
  async getApplications(@Query() query: any) {
    return this.applicationService.getApplications(query);
  }

  @Get(':applicationRefNumber')
  @ApiOperation({ summary: 'Get application by reference number' })
  @ApiParam({ name: 'applicationRefNumber', type: String })
  @ApiResponse({ status: 200, description: 'Application found' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async getApplicationByRef(@Param('applicationRefNumber') ref: string) {
    return this.applicationService.getApplicationByRef(ref);
  }
}
