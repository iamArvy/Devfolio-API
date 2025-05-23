import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RestAuthGuard } from '../guards/rest-auth.guard';
import { CertificationResponse } from './certification.response';

@ApiTags('Certifications')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@UseGuards(RestAuthGuard)
@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @ApiOkResponse({ type: [CertificationResponse] })
  @Get('')
  async getCertifications(@Req() req: { user: number }) {
    return await this.certificationService.user_certifications(req.user);
  }

  @ApiOkResponse({ type: CertificationResponse })
  @Get(':id')
  async getCertification(
    @Req() req: { user: number },
    @Param('id') id: string,
  ) {
    return await this.certificationService.user_certification(req.user, id);
  }
}
