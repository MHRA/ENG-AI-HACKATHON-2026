import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReferenceService } from './reference.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Reference Data')
@Controller('reference')
@UseGuards(ApiKeyGuard)
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Get(':category')
  @ApiOperation({ summary: 'Get reference data by category' })
  @ApiParam({ name: 'category', description: 'Reference data category (e.g. countries, titles, device-types, haemo-reaction-types)' })
  @ApiResponse({ status: 200, description: 'Reference data retrieved' })
  @ApiResponse({ status: 400, description: 'Unknown category' })
  async getByCategory(@Param('category') category: string, @Query() query: any) {
    return this.referenceService.getByCategory(category, query);
  }

  @Post('haemo-tables')
  @ApiOperation({ summary: 'Create haemo/SABRE reference table entry' })
  @ApiResponse({ status: 201, description: 'Entry created' })
  async postHaemoTable(@Body() body: any) {
    return this.referenceService.postHaemoTable(body);
  }

  @Patch('haemo-tables')
  @ApiOperation({ summary: 'Update haemo/SABRE reference table entry' })
  @ApiResponse({ status: 200, description: 'Entry updated' })
  async patchHaemoTable(@Body() body: any) {
    return this.referenceService.patchHaemoTable(body);
  }

  @Delete('haemo-tables')
  @ApiOperation({ summary: 'Delete haemo/SABRE reference table entry' })
  @ApiResponse({ status: 200, description: 'Entry deleted' })
  async deleteHaemoTable(@Body() body: any) {
    return this.referenceService.deleteHaemoTable(body);
  }
}
