import { Context, Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { ProfileEntity } from './profile.entity';
import { profiles } from '@prisma/client';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileEntity, { name: 'profile' })
  async getProfile(@Context() req: { user: string }): Promise<profiles> {
    return await this.profileService.user_profile(req.user);
  }
}
