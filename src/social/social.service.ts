import { Injectable, NotFoundException } from '@nestjs/common';
import { socials } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SocialService {
  constructor(private readonly prisma: PrismaService) {}

  user_socials = async (id: number): Promise<socials[]> => {
    const socials = await this.prisma.socials.findMany({
      where: { user_id: id },
    });

    return socials;
  };

  user_social = async (uid: number, sid: number): Promise<socials> => {
    const social = await this.prisma.socials.findUnique({
      where: { user_id: uid, id: sid },
    });
    if (!social) throw new NotFoundException('Profile not found');
    return social;
  };
}
