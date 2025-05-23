import { Test, TestingModule } from '@nestjs/testing';
import { CertificationResolver } from './certification.resolver';
import { CertificationService } from './certification.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Reflector } from '@nestjs/core';
import { mockArray, mockData, uid, req, id } from '../data';

describe('CertificationResolver', () => {
  let resolver: CertificationResolver;
  let service: CertificationService;

  const mockCertificationService = {
    user_certifications: jest.fn().mockResolvedValue(mockArray),
    user_certification: jest.fn().mockResolvedValue(mockData),
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
      const result = await resolver.getCertifications(req);
      expect(service.user_certifications).toHaveBeenCalledWith(uid);
      expect(result).toEqual(mockArray);
    });
  });

  describe('getCertification', () => {
    it('should return a specific certification for a user', async () => {
      const result = await resolver.getCertification(req, id);
      expect(service.user_certification).toHaveBeenCalledWith(uid, id);
      expect(result).toEqual(mockData);
    });
  });
});
