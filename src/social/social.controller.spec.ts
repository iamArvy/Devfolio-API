import { Test, TestingModule } from '@nestjs/testing';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';

describe('SocialController', () => {
  let controller: SocialController;
  let service: SocialService;

  const mockData = [{ id: 1 }];
  const mockService = {
    user_socials: jest.fn().mockResolvedValue(mockData),
    user_social: jest.fn().mockResolvedValue(mockData[0]),
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
    const req = { user: 1 };
    const result = await controller.getSocials(req);
    expect(service.user_socials).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });

  it('should return one social for a user', async () => {
    const req = { user: 1 };
    const result = await controller.getSocial(req, 1);
    expect(service.user_social).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockData[0]);
  });
});
