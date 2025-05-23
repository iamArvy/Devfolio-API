import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceResolver } from './experience.resolver';
import { ExperienceService } from './experience.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Reflector } from '@nestjs/core';
import { id, mockArray, mockData, req, uid } from '../data';

describe('ExperienceResolver', () => {
  let resolver: ExperienceResolver;
  let service: ExperienceService;

  const mockService = {
    user_experiences: jest.fn().mockResolvedValue(mockArray),
    user_experience: jest.fn().mockResolvedValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperienceResolver,
        { provide: ExperienceService, useValue: mockService },
        Reflector,
      ],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    resolver = module.get<ExperienceResolver>(ExperienceResolver);
    service = module.get<ExperienceService>(ExperienceService);
  });

  it('should return all experiences for a user', async () => {
    const result = await resolver.getExperiences(req);
    expect(service.user_experiences).toHaveBeenCalledWith(uid);
    expect(result).toEqual(mockArray);
  });

  it('should return a single experience for a user', async () => {
    const result = await resolver.getExperience(req, id);
    expect(service.user_experience).toHaveBeenCalledWith(uid, id);
    expect(result).toEqual(mockData);
  });
});
