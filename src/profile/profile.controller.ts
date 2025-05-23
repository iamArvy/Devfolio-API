import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { profiles } from '@prisma/client';
import { ProfileService } from './profile.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RestAuthGuard } from 'src/guards/rest-auth.guard';

@ApiTags('Profiles')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@UseGuards(RestAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('profile')
  async getProfile(@Req() req: { user: number }): Promise<profiles> {
    return await this.profileService.user_profile(req.user);
  }
}
