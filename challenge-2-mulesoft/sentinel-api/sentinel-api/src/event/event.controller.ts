import { Body, Controller, Get, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Events')
@Controller('events')
@UseGuards(ApiKeyGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // ──── GET endpoints ────

  @Get('application-organisation-inprogress')
  @ApiOperation({ summary: 'Get in-progress organisation applications' })
  async getAppOrgInprogress(@Query() query: any) {
    return this.eventService.getApplicationOrganisationInprogress(query);
  }

  @Get('application-device-inprogress')
  @ApiOperation({ summary: 'Get in-progress device applications' })
  async getAppDeviceInprogress(@Query() query: any) {
    return this.eventService.getApplicationDeviceInprogress(query);
  }

  @Get('organisation-name-previous-current')
  @ApiOperation({ summary: 'Get organisation name previous/current' })
  async getOrgNamePreviousCurrent(@Query() query: any) {
    return this.eventService.getOrganisationNamePreviousCurrent(
      Number(query.organisationId),
      query.eventRefNumber,
    );
  }

  @Get('further-info')
  @ApiOperation({ summary: 'Get further info application event' })
  async getFurtherInfo(@Query() query: any) {
    return this.eventService.getFurtherInfoApplicationEvent(query);
  }

  @Get('child-further-info-count')
  @ApiOperation({ summary: 'Get child application further info count' })
  async getChildFurtherInfoCount(@Query('eventRefId') eventRefId: string) {
    return this.eventService.getChildApplicationFurtherInfoCount(eventRefId);
  }

  @Get('unregister-application')
  @ApiOperation({ summary: 'Get unregister application' })
  async getUnregisterApp(@Query('eventRefId') eventRefId: string) {
    return this.eventService.getUnregisterApplication(eventRefId);
  }

  @Get('cfs-country-list')
  @ApiOperation({ summary: 'Get CFS application country list' })
  async getCfsCountryList(@Query('eventRefId') eventRefId: string) {
    return this.eventService.getCfsCountryList(eventRefId);
  }

  @Get('haemo-incident-search')
  @ApiOperation({ summary: 'Search haemo adverse blood incidents' })
  async searchHaemoIncidents(@Query() query: any) {
    return this.eventService.searchHaemoIncidents(query);
  }

  @Get('exceptional-use-search')
  @ApiOperation({ summary: 'Search exceptional use incidents' })
  async searchExceptionalUse(@Query() query: any) {
    return this.eventService.searchExceptionalUseIncidents(query);
  }

  @Get('exceptional-use-device-search')
  @ApiOperation({ summary: 'Search exceptional use device' })
  async getExceptionalUseDevice(@Query() query: any) {
    return this.eventService.getExceptionalUseDeviceSearch(query.eventRefNumber, Number(query.deviceId));
  }

  @Get('work-in-progress')
  @ApiOperation({ summary: 'Get application work in progress items' })
  async getWorkInProgress(@Query() query: any) {
    return this.eventService.getApplicationWorkInProgress(query);
  }

  @Get('application-detail')
  @ApiOperation({ summary: 'Get application detail' })
  async getApplicationDetail(@Query('eventRefId') eventRefId: string) {
    return this.eventService.getApplicationDetail(eventRefId);
  }

  @Get('haemo-case-footnote')
  @ApiOperation({ summary: 'Get haemo case footnotes' })
  async getHaemoCaseFootnote(@Query() query: any) {
    return this.eventService.getHaemoCaseFootnote(query);
  }

  @Get('haemo-case-review-auditlog')
  @ApiOperation({ summary: 'Get haemo case review audit log' })
  async getHaemoCaseReviewAuditlog(@Query() query: any) {
    return this.eventService.getHaemoCaseReviewAuditlog(query);
  }

  @Get('haemo-case-comments')
  @ApiOperation({ summary: 'Get haemo case comments' })
  async getHaemoCaseComments(@Query('eventRefNumber') eventRefNumber: string) {
    return this.eventService.getHaemoCaseComments(eventRefNumber);
  }

  // ──── PATCH endpoints ────

  @Patch('haemo-incident')
  @ApiOperation({ summary: 'Patch haemo incident' })
  @ApiResponse({ status: 200, description: 'Incident updated' })
  async patchHaemoIncident(@Body() body: any) {
    return this.eventService.patchHaemoIncident(body);
  }

  @Patch('humanitarian-status-decision')
  @ApiOperation({ summary: 'Patch humanitarian incident status decision' })
  async patchHumanitarianStatusDecision(@Body() body: any) {
    return this.eventService.patchHumanitarianStatusDecision(body);
  }

  @Patch('incidents-transfer')
  @ApiOperation({ summary: 'Transfer incidents between organisations' })
  async transferIncidents(@Body() body: any) {
    return this.eventService.transferIncidents(body);
  }

  // ──── POST endpoints ────

  @Post('humanitarian-consultant')
  @ApiOperation({ summary: 'Create humanitarian consultant' })
  @ApiResponse({ status: 201, description: 'Consultant created' })
  async postHumanitarianConsultant(@Body() body: any) {
    return this.eventService.postHumanitarianConsultant(body);
  }

  @Post('further-info')
  @ApiOperation({ summary: 'Post further info application event' })
  @ApiResponse({ status: 201, description: 'Further info created' })
  async postFurtherInfo(@Body() body: any) {
    return this.eventService.postFurtherInfoApplicationEvent(body);
  }

  @Post('haemo-serious-incident-confirmation')
  @ApiOperation({ summary: 'Post haemo serious incident confirmation' })
  @ApiResponse({ status: 201, description: 'Confirmation created' })
  async postHaemoConfirmation(@Body() body: any) {
    return this.eventService.postHaemoSeriousIncidentConfirmation(body);
  }

  @Post('haemo-footnote-document')
  @ApiOperation({ summary: 'Post haemo footnote document' })
  @ApiResponse({ status: 201, description: 'Document created' })
  async postHaemoFootnote(@Body() body: any) {
    return this.eventService.postHaemoFootnoteDocument(body);
  }

  @Post('cfs-order-application')
  @ApiOperation({ summary: 'Create CFS order application' })
  @ApiResponse({ status: 201, description: 'CFS order created' })
  async postCfsOrderApplication(@Body() body: any) {
    return this.eventService.postCfsOrderApplication(body);
  }

  @Post('haemo-case-comments')
  @ApiOperation({ summary: 'Add haemo case comment' })
  @ApiResponse({ status: 201, description: 'Comment added' })
  async postHaemoCaseComments(@Body() body: any) {
    return this.eventService.postHaemoCaseComments(body);
  }

  @Post('humanitarian-case-comments')
  @ApiOperation({ summary: 'Add humanitarian case comment' })
  @ApiResponse({ status: 201, description: 'Comment added' })
  async postHumanitarianCaseComments(@Body() body: any) {
    return this.eventService.postHumanitarianCaseComments(body);
  }

  @Post('cfs-application-document')
  @ApiOperation({ summary: 'Post CFS application document' })
  @ApiResponse({ status: 201, description: 'Document posted' })
  async postCfsApplicationDocument(@Body() body: any) {
    return this.eventService.postCfsApplicationDocument(body);
  }

  @Post('exceptional-use-attach-document')
  @ApiOperation({ summary: 'Attach document to exceptional use incident' })
  @ApiResponse({ status: 201, description: 'Document attached' })
  async postExceptionalUseAttachDocument(@Body() body: any) {
    return this.eventService.postExceptionalUseAttachDocument(body);
  }

  // ──── PUT endpoints ────

  @Put('document-storage-identifier')
  @ApiOperation({ summary: 'Update document storage identifier' })
  async putDocStorageId(@Body() body: any) {
    return this.eventService.putDocumentStorageIdentifier(body);
  }

  @Put('application-organisation-registration-status')
  @ApiOperation({ summary: 'Update application organisation registration status' })
  async putAppOrgRegStatus(@Body() body: any) {
    return this.eventService.putApplicationOrganisationRegistrationStatus(body);
  }

  @Put('application-device-registration-status')
  @ApiOperation({ summary: 'Update application device registration status' })
  async putAppDeviceRegStatus(@Body() body: any) {
    return this.eventService.putApplicationDeviceRegistrationStatus(body);
  }

  @Put('application-organisation-draft')
  @ApiOperation({ summary: 'Update application organisation draft' })
  async putAppOrgDraft(@Body() body: any) {
    return this.eventService.putApplicationOrganisationDraft(body);
  }

  @Put('application-assignment')
  @ApiOperation({ summary: 'Update application assignment' })
  async putAppAssignment(@Body() body: any) {
    return this.eventService.putApplicationAssignment(body);
  }

  @Put('cfs-order-application-status')
  @ApiOperation({ summary: 'Update CFS order application status' })
  async putCfsOrderStatus(@Body() body: any) {
    return this.eventService.putCfsOrderApplicationStatus(body);
  }

  @Put('further-info')
  @ApiOperation({ summary: 'Update further info application event' })
  async putFurtherInfo(@Body() body: any) {
    return this.eventService.putFurtherInfoApplicationEvent(body);
  }

  @Put('derogations-final-decision')
  @ApiOperation({ summary: 'Update derogations final decision' })
  async putDerogationsFinalDecision(@Body() body: any) {
    return this.eventService.putDerogationsFinalDecision(body);
  }

  @Put('derogations-dct-comments')
  @ApiOperation({ summary: 'Update derogations DCT comments and supporting docs' })
  async putDerogationsDctComments(@Body() body: any) {
    return this.eventService.putDerogationsDctCommentsSupportingDocs(body);
  }

  @Put('derogations-correspondence-documents')
  @ApiOperation({ summary: 'Update derogations correspondence decision documents' })
  async putDerogationsCorrespondence(@Body() body: any) {
    return this.eventService.putDerogationsCorrespondenceDecisionDocuments(body);
  }
}
