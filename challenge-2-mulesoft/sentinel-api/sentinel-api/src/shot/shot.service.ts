import { Injectable, BadRequestException } from '@nestjs/common';
import { ShotRepository } from './shot.repository';

@Injectable()
export class ShotService {
  constructor(private readonly repo: ShotRepository) {}

  async getOperation(operation: string) {
    switch (operation) {
      case 'event-confirm':
        return (await this.repo.getEventConfirm()).recordset;
      case 'event-notify':
        return (await this.repo.getEventNotify()).recordset;
      case 'footnotes':
        return (await this.repo.getFootnotes()).recordset;
      case 'react-notify':
        return (await this.repo.getReactNotify()).recordset;
      case 'org-search':
        return (await this.repo.getOrgSearch()).recordset;
      case 'user-search':
        return (await this.repo.getUserSearch()).recordset;
      default:
        throw new BadRequestException(`Unknown SHOT GET operation: ${operation}`);
    }
  }

  async putOperation(operation: string, body: any) {
    let result: any;

    switch (operation) {
      case 'send-reaction-confirmation':
        result = await this.repo.sendReactionConfirmation(body);
        break;
      case 'send-url-packet':
        result = await this.repo.sendUrlPacket(body);
        break;
      case 'confirm-read':
        result = await this.repo.confirmRead(body);
        break;
      case 'confirm-footnote-read':
        result = await this.repo.confirmFootnoteRead(body.footnoteIdsJson);
        break;
      case 'confirm-reaction-notification-document-read':
        result = await this.repo.confirmReactionNotificationDocumentRead(body.footnoteIdsJson);
        break;
      case 'confirm-event-confirmation-document-read':
        result = await this.repo.confirmEventConfirmationDocumentRead(body.footnoteIdsJson);
        break;
      case 'confirm-event-notification-document-read':
        result = await this.repo.confirmEventNotificationDocumentRead(body.footnoteIdsJson);
        break;
      default:
        throw new BadRequestException(`Unknown SHOT PUT operation: ${operation}`);
    }

    return result.recordset?.[0] ?? { success: true };
  }
}
