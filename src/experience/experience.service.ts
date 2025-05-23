import { Injectable, NotFoundException } from '@nestjs/common';
import { experiences } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  async user_experiences(id: bigint): Promise<experiences[]> {
    const experiences = await this.prisma.experiences.findMany({
      where: { user_id: id },
    });

    return experiences;
  }

  async user_experience(uid: bigint, eid: bigint): Promise<experiences> {
    const experience = await this.prisma.experiences.findUnique({
      where: { user_id: uid, id: eid },
    });
    if (!experience) throw new NotFoundException('Profile not found');
    return experience;
  }
}
