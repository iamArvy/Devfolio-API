import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';

describe('ExperienceController', () => {
  let service: ExperienceService;
  let controller: ExperienceController;

  const mockData = [
    {
      id: 1,
    },
  ];

  const mockService = {
    user_experiences: jest.fn().mockResolvedValue(mockData),
    user_experience: jest.fn().mockResolvedValue(mockData[0]),
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
    const req = { user: 1 };
    const result = await controller.getExperiences(req);
    expect(service.user_experiences).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });

  it('should return a single experience for a user', async () => {
    const req = { user: 1 };
    const result = await controller.getExperience(req, 1);
    expect(service.user_experience).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockData[0]);
  });
});
