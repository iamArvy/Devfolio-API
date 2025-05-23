import { Injectable, NotFoundException } from '@nestjs/common';
import { stacks } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StackService {
  constructor(private readonly prisma: PrismaService) {}

  user_stacks = async (id: number): Promise<stacks[]> => {
    const stacks = await this.prisma.stacks.findMany({
      where: { user_id: id },
    });

    return stacks;
  };

  user_stack = async (uid: number, sid: number): Promise<stacks> => {
    const stack = await this.prisma.stacks.findUnique({
      where: { user_id: uid, id: sid },
    });
    if (!stack) throw new NotFoundException('Stack not found');
    return stack;
  };
}
