import { Controller, Get, Param, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { projects } from '@prisma/client';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('projects')
  async getProjects(@Req() req: { user: bigint }): Promise<projects[]> {
    return await this.projectService.user_projects(req.user);
  }

  @Get('projects/:id')
  async getProject(
    @Req() req: { user: bigint },
    @Param('id') id: bigint,
  ): Promise<projects> {
    return await this.projectService.user_project(req.user, id);
  }
}
