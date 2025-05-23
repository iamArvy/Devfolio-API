import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { mockData, uid } from '../data';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;

  const mockService = {
    user_profile: jest.fn().mockResolvedValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [{ provide: ProfileService, useValue: mockService }],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user profile', async () => {
    const req = { user: uid };
    const result = await controller.getProfile(req);
    expect(service.user_profile).toHaveBeenCalledWith(uid);
    expect(result).toEqual(mockData);
  });
});
