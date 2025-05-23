import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { certifications } from '@prisma/client';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RestAuthGuard } from '../guards/rest-auth.guard';

@ApiTags('Certifications')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@UseGuards(RestAuthGuard)
@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @Get('certifications')
  async getCertifications(
    @Req() req: { user: number },
  ): Promise<certifications[]> {
    return await this.certificationService.user_certifications(req.user);
  }

  @Get('certifications/:id')
  async getCertification(
    @Req() req: { user: number },
    @Param('id') id: number,
  ): Promise<certifications> {
    return await this.certificationService.user_certification(req.user, id);
  }
}
