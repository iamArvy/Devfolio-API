import { Injectable, NotFoundException } from '@nestjs/common';
import { experiences } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  user_experiences = async (id: string): Promise<experiences[]> => {
    const experiences = await this.prisma.experiences.findMany({
      where: { user_id: id },
    });

    return experiences;
  };

  user_experience = async (uid: string, eid: string): Promise<experiences> => {
    const experience = await this.prisma.experiences.findUnique({
      where: { user_id: uid, id: eid },
    });
    if (!experience) throw new NotFoundException('Profile not found');
    return experience;
  };
}
