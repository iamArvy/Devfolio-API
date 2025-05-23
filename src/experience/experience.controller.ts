import { Controller, Get, Param, Req } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ExperienceResponse } from './experience.response'; // update path as needed

@ApiTags('Experiences')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiOkResponse({ type: [ExperienceResponse] })
  @Get('')
  async getExperiences(@Req() req: { user: number }) {
    return await this.experienceService.user_experiences(req.user);
  }

  @ApiOkResponse({ type: ExperienceResponse })
  @Get(':id')
  async getExperience(@Req() req: { user: number }, @Param('id') id: string) {
    return await this.experienceService.user_experience(req.user, id);
  }
}
