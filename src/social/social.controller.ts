import { Controller, Get, Param, Req } from '@nestjs/common';
import { SocialService } from './social.service';
import { socials } from '@prisma/client';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}
  @Get('socials')
  async getSocials(@Req() req: { user: number }): Promise<socials[]> {
    return await this.socialService.user_socials(req.user);
  }

  @Get('socials/:id')
  async getSocial(
    @Req() req: { user: number },
    @Param('id') id: number,
  ): Promise<socials> {
    return await this.socialService.user_social(req.user, id);
  }
}
