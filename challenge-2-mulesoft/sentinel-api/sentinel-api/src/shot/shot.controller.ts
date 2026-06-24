import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShotService } from './shot.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('SHOT (SABRE Bridge)')
@Controller('shot')
@UseGuards(ApiKeyGuard)
export class ShotController {
  constructor(private readonly shotService: ShotService) {}

  @Get(':operation')
  @ApiOperation({ summary: 'SHOT WSDL GET operation (polls pending SABRE messages)' })
  @ApiParam({ name: 'operation', description: 'event-confirm, event-notify, footnotes, react-notify, org-search, user-search' })
  @ApiResponse({ status: 200, description: 'SHOT data retrieved' })
  @ApiResponse({ status: 400, description: 'Unknown operation' })
  async getOperation(@Param('operation') operation: string) {
    return this.shotService.getOperation(operation);
  }

  @Put(':operation')
  @ApiOperation({ summary: 'SHOT WSDL PUT operation' })
  @ApiParam({ name: 'operation', description: 'send-reaction-confirmation, send-url-packet, confirm-read, confirm-footnote-read, confirm-*-document-read' })
  @ApiResponse({ status: 200, description: 'SHOT operation completed' })
  @ApiResponse({ status: 400, description: 'Unknown operation' })
  async putOperation(@Param('operation') operation: string, @Body() body: any) {
    return this.shotService.putOperation(operation, body);
  }
}
