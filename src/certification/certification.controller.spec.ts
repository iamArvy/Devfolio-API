import { CertificationController } from './certification.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CertificationService } from './certification.service';

describe('CertificationController', () => {
  let service: CertificationService;
  let controller: CertificationController;

  const mockData = [
    {
      id: 1,
    },
  ];

  const mockService = {
    user_certifications: jest.fn().mockResolvedValue(mockData),
    user_certification: jest.fn().mockResolvedValue(mockData[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificationController,
        {
          provide: CertificationService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CertificationController>(CertificationController);
    service = module.get<CertificationService>(CertificationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all certifications for a user', async () => {
    const req = { user: 1 };
    const result = await controller.getCertifications(req);
    expect(service.user_certifications).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });

  it('should return a single certification for a user', async () => {
    const req = { user: 1 };
    const result = await controller.getCertification(req, 1);
    expect(service.user_certification).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockData[0]);
  });
});
