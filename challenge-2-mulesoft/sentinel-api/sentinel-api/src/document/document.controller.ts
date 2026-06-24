import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Documents')
@Controller('documents')
@UseGuards(ApiKeyGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  @ApiOperation({ summary: 'List documents (query-routed)' })
  @ApiResponse({ status: 200, description: 'Documents retrieved' })
  async getDocuments(@Query() query: any) {
    return this.documentService.getDocuments(query);
  }

  @Get(':documentId')
  @ApiOperation({ summary: 'Get document by ID' })
  @ApiParam({ name: 'documentId', type: Number })
  @ApiResponse({ status: 200, description: 'Document found' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async getDocumentById(@Param('documentId', ParseIntPipe) documentId: number) {
    return this.documentService.getDocumentById(documentId);
  }
}
