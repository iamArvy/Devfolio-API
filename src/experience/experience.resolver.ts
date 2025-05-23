import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { ExperienceEntity } from './experience.entity';
import { experiences } from '@prisma/client';
import { ExperienceService } from './experience.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver()
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Query(() => [ExperienceEntity], { name: 'experiences' })
  async getExperiences(
    @Context() req: { user: number },
  ): Promise<experiences[]> {
    return await this.experienceService.user_experiences(req.user);
  }

  @Query(() => ExperienceEntity, { name: 'experience' })
  async getExperience(
    @Context() req: { user: number },
    @Args('id') id: string,
  ): Promise<experiences> {
    return await this.experienceService.user_experience(req.user, id);
  }
}
