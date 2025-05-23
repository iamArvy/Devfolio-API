import { Injectable, NotFoundException } from '@nestjs/common';
import { profiles } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  user_profile = async (id: string): Promise<profiles> => {
    const profile = await this.prisma.profiles.findUnique({
      where: { user_id: id },
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  };
}
