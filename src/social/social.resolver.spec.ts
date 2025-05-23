import { Test, TestingModule } from '@nestjs/testing';
import { SocialResolver } from './social.resolver';
import { SocialService } from './social.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Reflector } from '@nestjs/core';
import { mockArray, mockData, id, uid, req } from '../data';

describe('SocialResolver', () => {
  let resolver: SocialResolver;
  let service: SocialService;

  const mockService = {
    user_socials: jest.fn().mockResolvedValue(mockArray),
    user_social: jest.fn().mockResolvedValue(mockData),
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
    const result = await resolver.getSocials(req);
    expect(service.user_socials).toHaveBeenCalledWith(uid);
    expect(result).toEqual(mockArray);
  });

  it('should return one social for a user', async () => {
    const result = await resolver.getSocial(req, id);
    expect(service.user_social).toHaveBeenCalledWith(uid, id);
    expect(result).toEqual(mockData);
  });
});
