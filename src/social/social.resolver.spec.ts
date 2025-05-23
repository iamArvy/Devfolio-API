import { Test, TestingModule } from '@nestjs/testing';
import { SocialResolver } from './social.resolver';
import { SocialService } from './social.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Reflector } from '@nestjs/core';

describe('SocialResolver', () => {
  let resolver: SocialResolver;
  let service: SocialService;

  const mockData = [{ id: 1 }];
  const mockService = {
    user_socials: jest.fn().mockResolvedValue(mockData),
    user_social: jest.fn().mockResolvedValue(mockData[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialResolver,
        { provide: SocialService, useValue: mockService },
        Reflector,
      ],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    resolver = module.get<SocialResolver>(SocialResolver);
    service = module.get<SocialService>(SocialService);
  });

  it('should return all socials for a user', async () => {
    const context = { user: 1 };
    const result = await resolver.getSocials(context);
    expect(service.user_socials).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });

  it('should return one social for a user', async () => {
    const context = { user: 1 };
    const result = await resolver.getSocial(context, 1);
    expect(service.user_social).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockData[0]);
  });
});
