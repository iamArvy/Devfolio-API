import { Controller, Get, Req } from '@nestjs/common';
import { profiles } from '@prisma/client';
import { ProfileService } from './profile.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Profiles')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('profile')
  async getProfile(@Req() req: { user: bigint }): Promise<profiles> {
    return await this.profileService.user_profile(req.user);
  }
}
