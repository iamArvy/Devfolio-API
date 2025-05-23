import { Controller, Get, Param, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ProjectResponse } from './project.response'; // Adjust path as needed

@ApiTags('Projects')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOkResponse({ type: [ProjectResponse] })
  @Get('')
  async getProjects(@Req() req: { user: number }) {
    return await this.projectService.user_projects(req.user);
  }

  @ApiOkResponse({ type: ProjectResponse })
  @Get(':id')
  async getProject(@Req() req: { user: number }, @Param('id') id: string) {
    return await this.projectService.user_project(req.user, id);
  }
}
