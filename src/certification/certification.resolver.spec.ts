import { Test, TestingModule } from '@nestjs/testing';
import { CertificationResolver } from './certification.resolver';
import { CertificationService } from './certification.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Reflector } from '@nestjs/core';

describe('CertificationResolver', () => {
  let resolver: CertificationResolver;
  let service: CertificationService;

  const mockData = [
    {
      id: 1,
    },
  ];

  const mockCertificationService = {
    user_certifications: jest.fn().mockResolvedValue(mockData),
    user_certification: jest.fn().mockResolvedValue(mockData[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificationResolver,
        { provide: CertificationService, useValue: mockCertificationService },
        Reflector, // Needed for guards
      ],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue({
        canActivate: () => true,
      })
      .compile();

    resolver = module.get<CertificationResolver>(CertificationResolver);
    service = module.get<CertificationService>(CertificationService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getCertifications', () => {
    it('should return all certifications for a user', async () => {
      const req = { user: 1 };
      const result = await resolver.getCertifications(req);
      expect(service.user_certifications).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockData);
    });
  });

  describe('getCertification', () => {
    it('should return a specific certification for a user', async () => {
      const context = { user: 1 };
      const result = await resolver.getCertification(context, 1);
      expect(service.user_certification).toHaveBeenCalledWith(1, 1);
      expect(result).toEqual(mockData[0]);
    });
  });
});
