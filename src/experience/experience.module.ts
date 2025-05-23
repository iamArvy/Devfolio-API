import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { ExperienceResolver } from './experience.resolver';

@Module({
  controllers: [ExperienceController],
  providers: [ExperienceService, ExperienceResolver],
})
export class ExperienceModule {}
