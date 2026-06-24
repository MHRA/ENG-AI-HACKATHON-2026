import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Contacts')
@Controller('contacts')
@UseGuards(ApiKeyGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @ApiOperation({ summary: 'List or search contacts' })
  @ApiResponse({ status: 200, description: 'Contacts retrieved' })
  async getContacts(@Query() query: any) {
    return this.contactService.getContacts(query);
  }

  @Get(':contactId')
  @ApiOperation({ summary: 'Get contact by ID' })
  @ApiParam({ name: 'contactId', type: Number })
  @ApiResponse({ status: 200, description: 'Contact found' })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  async getContactById(@Param('contactId', ParseIntPipe) contactId: number) {
    return this.contactService.getContactById(contactId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a contact' })
  @ApiResponse({ status: 201, description: 'Contact created' })
  async createContact(@Body() dto: any) {
    return this.contactService.createContact(dto);
  }

  @Put(':contactId')
  @ApiOperation({ summary: 'Update a contact' })
  @ApiParam({ name: 'contactId', type: Number })
  @ApiResponse({ status: 200, description: 'Contact updated' })
  async updateContact(@Param('contactId', ParseIntPipe) contactId: number, @Body() dto: any) {
    return this.contactService.updateContact(contactId, dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete contacts' })
  @ApiResponse({ status: 200, description: 'Contacts deleted' })
  async deleteContacts(@Body() body: { orgId: number; contactIds: number[]; userId: number }) {
    return this.contactService.deleteContacts(body.orgId, body.contactIds, body.userId);
  }
}
