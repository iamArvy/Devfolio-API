import { Test, TestingModule } from '@nestjs/testing';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { mockArray, mockData, id, uid, req } from '../data';

describe('SocialController', () => {
  let controller: SocialController;
  let service: SocialService;

  const mockService = {
    user_socials: jest.fn().mockResolvedValue(mockArray),
    user_social: jest.fn().mockResolvedValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialController],
      providers: [{ provide: SocialService, useValue: mockService }],
    }).compile();

    controller = module.get<SocialController>(SocialController);
    service = module.get<SocialService>(SocialService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all socials for a user', async () => {
    const result = await controller.getSocials(req);
    expect(service.user_socials).toHaveBeenCalledWith(uid);
    expect(result).toEqual(mockArray);
  });

  it('should return one social for a user', async () => {
    const result = await controller.getSocial(req, id);
    expect(service.user_social).toHaveBeenCalledWith(uid, id);
    expect(result).toEqual(mockData);
  });
});
