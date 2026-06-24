import { Module } from '@nestjs/common';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';
import { OrganisationRepository } from './organisation.repository';

@Module({
  controllers: [OrganisationController],
  providers: [OrganisationService, OrganisationRepository],
  exports: [OrganisationService],
})
export class OrganisationModule {}
