import { Injectable, NotFoundException } from '@nestjs/common';
import { certifications } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CertificationService {
  constructor(private readonly prisma: PrismaService) {}

  user_certifications = async (id: string): Promise<certifications[]> => {
    const certifications = await this.prisma.certifications.findMany({
      where: { user_id: id },
    });

    return certifications;
  };

  user_certification = async (
    uid: string,
    cid: string,
  ): Promise<certifications> => {
    const certification = await this.prisma.certifications.findUnique({
      where: { user_id: uid, id: cid },
    });
    if (!certification) throw new NotFoundException('Certification not found');
    return certification;
  };
}
