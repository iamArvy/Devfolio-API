import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceResolver } from './experience.resolver';
import { ExperienceService } from './experience.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Reflector } from '@nestjs/core';

describe('ExperienceResolver', () => {
  let resolver: ExperienceResolver;
  let service: ExperienceService;

  const mockData = [{ id: 1 }];
  const mockService = {
    user_experiences: jest.fn().mockResolvedValue(mockData),
    user_experience: jest.fn().mockResolvedValue(mockData[0]),
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
    const context = { user: 1 };
    const result = await resolver.getExperiences(context);
    expect(service.user_experiences).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });

  it('should return one experience for a user', async () => {
    const context = { user: 1 };
    const result = await resolver.getExperience(context, 1);
    expect(service.user_experience).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockData[0]);
  });
});
