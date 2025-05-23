import { Test, TestingModule } from '@nestjs/testing';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Reflector } from '@nestjs/core';

describe('ProfileResolver', () => {
  let resolver: ProfileResolver;
  let service: ProfileService;

  const mockProfile = { id: 1 };
  const mockService = {
    user_profile: jest.fn().mockResolvedValue(mockProfile),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileResolver,
        { provide: ProfileService, useValue: mockService },
        Reflector,
      ],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    resolver = module.get<ProfileResolver>(ProfileResolver);
    service = module.get<ProfileService>(ProfileService);
  });

  it('should return the user profile', async () => {
    const context = { user: 1 };
    const result = await resolver.getProfile(context);
    expect(service.user_profile).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockProfile);
  });
});
