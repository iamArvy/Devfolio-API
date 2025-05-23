import { Injectable, NotFoundException } from '@nestjs/common';
import { certifications } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CertificationService {
  constructor(private readonly prisma: PrismaService) {}

  async user_certifications(id: bigint): Promise<certifications[]> {
    const certifications = await this.prisma.certifications.findMany({
      where: { user_id: id },
    });

    return certifications;
  }

  async user_certification(uid: bigint, cid: bigint): Promise<certifications> {
    const certification = await this.prisma.certifications.findUnique({
      where: { user_id: uid, id: cid },
    });
    if (!certification) throw new NotFoundException('Certification not found');
    return certification;
  }
}
