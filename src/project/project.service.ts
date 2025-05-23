import { Injectable, NotFoundException } from '@nestjs/common';
import { projects } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  user_projects = async (id: number): Promise<projects[]> => {
    const projects = await this.prisma.projects.findMany({
      where: { user_id: id },
    });

    return projects;
  };

  user_project = async (uid: number, pid: string): Promise<projects> => {
    const project = await this.prisma.projects.findUnique({
      where: { user_id: uid, id: pid },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  };
}
