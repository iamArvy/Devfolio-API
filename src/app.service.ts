import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async validateClient(id: string, secret: string): Promise<bigint> {
    const client = await this.prisma.clients.findFirst({
      where: { id, secret },
    });

    if (!client) throw new UnauthorizedException('Unauthorized user');

    return client.user_id;
  }
}
