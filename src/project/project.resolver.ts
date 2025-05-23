import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { ProjectEntity } from './project.entity';
import { projects } from '@prisma/client';
import { ProjectService } from './project.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [ProjectEntity], { name: 'projects' })
  async getProjects(@Context() req: { user: number }): Promise<projects[]> {
    return await this.projectService.user_projects(req.user);
  }

  @Query(() => ProjectEntity, { name: 'project' })
  async getProject(
    @Context() req: { user: number },
    @Args('id') id: number,
  ): Promise<projects> {
    return await this.projectService.user_project(req.user, id);
  }
}
