import { Test, TestingModule } from '@nestjs/testing';
import { CertificationResolver } from './certification.resolver';

describe('CertificationResolver', () => {
  let resolver: CertificationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertificationResolver],
    }).compile();

    resolver = module.get<CertificationResolver>(CertificationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
