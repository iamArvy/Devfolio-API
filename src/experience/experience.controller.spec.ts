import { id, mockArray, mockData, req, uid } from '../data/mock';
import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';

describe('ExperienceController', () => {
  let service: ExperienceService;
  let controller: ExperienceController;

  const mockService = {
    user_experiences: jest.fn().mockResolvedValue(mockArray),
    user_experience: jest.fn().mockResolvedValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperienceController,
        {
          provide: ExperienceService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ExperienceController>(ExperienceController);
    service = module.get<ExperienceService>(ExperienceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all experiences for a user', async () => {
    const result = await controller.getExperiences(req);
    expect(service.user_experiences).toHaveBeenCalledWith(uid);
    expect(result).toEqual(mockArray);
  });

  it('should return a single experience for a user', async () => {
    const result = await controller.getExperience(req, id);
    expect(service.user_experience).toHaveBeenCalledWith(uid, id);
    expect(result).toEqual(mockData);
  });
});
