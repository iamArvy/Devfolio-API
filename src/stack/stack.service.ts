import { Injectable, NotFoundException } from '@nestjs/common';
import { stacks } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StackService {
  constructor(private readonly prisma: PrismaService) {}

  async user_stacks(id: bigint): Promise<stacks[]> {
    const stacks = await this.prisma.stacks.findMany({
      where: { user_id: id },
    });

    return stacks;
  }

  async user_stack(uid: bigint, sid: bigint): Promise<stacks> {
    const stack = await this.prisma.stacks.findUnique({
      where: { user_id: uid, id: sid },
    });
    if (!stack) throw new NotFoundException('Profile not found');
    return stack;
  }
}
