import { Injectable, NotFoundException } from '@nestjs/common';
import { projects } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async user_projects(id: bigint): Promise<projects[]> {
    const projects = await this.prisma.projects.findMany({
      where: { user_id: id },
    });

    return projects;
  }

  async user_project(uid: bigint, pid: bigint): Promise<projects> {
    const project = await this.prisma.projects.findUnique({
      where: { user_id: uid, id: pid },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}
