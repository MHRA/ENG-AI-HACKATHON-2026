import { Module } from '@nestjs/common';
import { ReferenceController } from './reference.controller';
import { ReferenceService } from './reference.service';
import { ReferenceRepository } from './reference.repository';

@Module({
  controllers: [ReferenceController],
  providers: [ReferenceService, ReferenceRepository],
  exports: [ReferenceService],
})
export class ReferenceModule {}
