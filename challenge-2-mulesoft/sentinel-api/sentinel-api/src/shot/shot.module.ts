import { Module } from '@nestjs/common';
import { ShotController } from './shot.controller';
import { ShotService } from './shot.service';
import { ShotRepository } from './shot.repository';

@Module({
  controllers: [ShotController],
  providers: [ShotService, ShotRepository],
  exports: [ShotService],
})
export class ShotModule {}
