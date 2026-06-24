import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganisationService } from './organisation.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Organisations')
@Controller('organisations')
@UseGuards(ApiKeyGuard)
export class OrganisationController {
  constructor(private readonly orgService: OrganisationService) {}

  @Get()
  @ApiOperation({ summary: 'Search organisations' })
  @ApiResponse({ status: 200, description: 'Organisations retrieved' })
  async search(@Query() query: any) {
    return this.orgService.searchOrganisations(query);
  }

  @Get(':organisationId')
  @ApiOperation({ summary: 'Get organisation detail' })
  @ApiParam({ name: 'organisationId', type: Number })
  @ApiResponse({ status: 200, description: 'Organisation found' })
  @ApiResponse({ status: 404, description: 'Organisation not found' })
  async getById(@Param('organisationId', ParseIntPipe) id: number) {
    return this.orgService.getOrganisationById(id);
  }

  @Get(':organisationId/parent')
  @ApiOperation({ summary: 'Get parent association' })
  async getParent(@Param('organisationId', ParseIntPipe) id: number) {
    return this.orgService.getParentAssociation(id);
  }

  @Get(':organisationId/notes')
  @ApiOperation({ summary: 'Get organisation notes' })
  async getNotes(@Param('organisationId', ParseIntPipe) id: number, @Query() query: any) {
    return this.orgService.getNotes({ orgId: id, ...query });
  }

  @Post('notes')
  @ApiOperation({ summary: 'Create a note' })
  @ApiResponse({ status: 201, description: 'Note created' })
  async createNote(@Body() body: any) {
    return this.orgService.createNote(body);
  }

  @Get(':organisationId/migration-grace-period')
  @ApiOperation({ summary: 'Get migration grace period' })
  async getGracePeriod(@Param('organisationId', ParseIntPipe) id: number, @Query() query: any) {
    return this.orgService.getMigrationGracePeriod({ organisationId: String(id), ...query });
  }

  @Post('registration')
  @ApiOperation({ summary: 'Register an organisation' })
  @ApiResponse({ status: 201, description: 'Organisation registered' })
  async register(@Body() body: any) {
    return this.orgService.register(body);
  }

  @Put('registration')
  @ApiOperation({ summary: 'Update organisation registration' })
  @ApiResponse({ status: 200, description: 'Registration updated' })
  async updateRegistration(@Body() body: any) {
    return this.orgService.updateRegistration(body);
  }

  @Post('registration/approval')
  @ApiOperation({ summary: 'Approve registration' })
  @ApiResponse({ status: 201, description: 'Registration approved' })
  async approveRegistration(@Body() body: any) {
    return this.orgService.approveRegistration(body);
  }

  @Post('unregister')
  @ApiOperation({ summary: 'Unregister organisation' })
  @ApiResponse({ status: 201, description: 'Organisation unregistered' })
  async unregister(@Body() body: any) {
    return this.orgService.unregister(body);
  }

  @Post('account')
  @ApiOperation({ summary: 'Create account' })
  @ApiResponse({ status: 201, description: 'Account created' })
  async createAccount(@Body() body: any) {
    return this.orgService.createAccount(body);
  }

  @Get(':organisationId/compliance')
  @ApiOperation({ summary: 'Get compliance records' })
  async getCompliance(@Param('organisationId') id: string) {
    return this.orgService.getCompliance(id);
  }

  @Post('compliance')
  @ApiOperation({ summary: 'Create compliance record' })
  @ApiResponse({ status: 201, description: 'Compliance created' })
  async createCompliance(@Body() body: any) {
    return this.orgService.createCompliance(body);
  }

  @Put('compliance')
  @ApiOperation({ summary: 'Update compliance record' })
  @ApiResponse({ status: 200, description: 'Compliance updated' })
  async updateCompliance(@Body() body: any) {
    return this.orgService.updateCompliance(body);
  }
}
