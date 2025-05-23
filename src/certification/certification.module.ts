import { Module } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CertificationController } from './certification.controller';
import { CertificationResolver } from './certification.resolver';

@Module({
  controllers: [CertificationController],
  providers: [CertificationService, CertificationResolver],
})
export class CertificationModule {}
