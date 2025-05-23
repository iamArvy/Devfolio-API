import { CertificationController } from './certification.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CertificationService } from './certification.service';
import { id, mockArray, mockData, req, uid } from '../data';

describe('CertificationController', () => {
  let service: CertificationService;
  let controller: CertificationController;

  const mockService = {
    user_certifications: jest.fn().mockResolvedValue(mockArray),
    user_certification: jest.fn().mockResolvedValue(mockData),
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
    const result = await controller.getCertifications(req);
    expect(service.user_certifications).toHaveBeenCalledWith(uid);
    expect(result).toEqual(mockArray);
  });

  it('should return a single certification for a user', async () => {
    const result = await controller.getCertification(req, id);
    expect(service.user_certification).toHaveBeenCalledWith(uid, id);
    expect(result).toEqual(mockData);
  });
});
