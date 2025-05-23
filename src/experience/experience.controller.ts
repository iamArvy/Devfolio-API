import { Controller, Get, Param, Req } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { experiences } from '@prisma/client';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Experiences')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get('experiences')
  async getExperiences(@Req() req: { user: string }): Promise<experiences[]> {
    return await this.experienceService.user_experiences(req.user);
  }

  @Get('experiences/:id')
  async getExperience(
    @Req() req: { user: string },
    @Param('id') id: string,
  ): Promise<experiences> {
    return await this.experienceService.user_experience(req.user, id);
  }
}
