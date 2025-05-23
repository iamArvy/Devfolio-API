import { Controller, Get, Param, Req } from '@nestjs/common';
import { SocialService } from './social.service';
import { socials } from '@prisma/client';
import {
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { SocialResponse } from './social.response';

@ApiTags('Socials')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all socials for a user' })
  @ApiOkResponse({ description: 'List of socials', type: [SocialResponse] })
  async getSocials(@Req() req: { user: number }): Promise<socials[]> {
    return await this.socialService.user_socials(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single social by ID' })
  @ApiParam({ name: 'id', description: 'Social ID', type: String })
  @ApiOkResponse({ description: 'Social record', type: SocialResponse })
  async getSocial(
    @Req() req: { user: number },
    @Param('id') id: string,
  ): Promise<socials> {
    return await this.socialService.user_social(req.user, id);
  }
}
