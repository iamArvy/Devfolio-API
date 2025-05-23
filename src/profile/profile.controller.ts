import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RestAuthGuard } from '../guards/rest-auth.guard';
import { ProfileResponse } from './profile.response'; // adjust path as needed

@ApiTags('Profiles')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@UseGuards(RestAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOkResponse({ type: ProfileResponse })
  @Get('')
  async getProfile(@Req() req: { user: number }): Promise<ProfileResponse> {
    return await this.profileService.user_profile(req.user);
  }
}
