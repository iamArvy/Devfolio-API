import { Injectable, NotFoundException } from '@nestjs/common';
import { profiles } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async user_profile(id: bigint): Promise<profiles> {
    const profile = await this.prisma.profiles.findUnique({
      where: { user_id: id },
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }
}
