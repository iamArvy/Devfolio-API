import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { certifications } from '@prisma/client';
import { CertificationEntity } from './certification.entity';
import { CertificationService } from './certification.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver()
export class CertificationResolver {
  constructor(private readonly certificationService: CertificationService) {}
  @Query(() => [CertificationEntity], { name: 'certifications' })
  async getCertifications(
    @Context() req: { user: number },
  ): Promise<certifications[]> {
    return await this.certificationService.user_certifications(req.user);
  }

  @Query(() => CertificationEntity, { name: 'certification' })
  async getCertification(
    @Context() req: { user: number },
    @Args('id') id: string,
  ): Promise<certifications> {
    return await this.certificationService.user_certification(req.user, id);
  }
}
