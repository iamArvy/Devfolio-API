import { Injectable, NotFoundException } from '@nestjs/common';
import { socials } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SocialService {
  constructor(private readonly prisma: PrismaService) {}

  async user_socials(id: bigint): Promise<socials[]> {
    const socials = await this.prisma.socials.findMany({
      where: { user_id: id },
    });

    return socials;
  }

  async user_social(uid: bigint, sid: bigint): Promise<socials> {
    const social = await this.prisma.socials.findUnique({
      where: { user_id: uid, id: sid },
    });
    if (!social) throw new NotFoundException('Profile not found');
    return social;
  }
}
