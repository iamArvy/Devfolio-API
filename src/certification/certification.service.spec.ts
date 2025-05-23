import { Test, TestingModule } from '@nestjs/testing';
import { CertificationService } from './certification.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('CertificationService', () => {
  let service: CertificationService;
  let prisma: PrismaService;

  const mockData = [
    {
      id: 1,
    },
  ];

  const mockPrismaService = {
    certifications: {
      findMany: jest.fn().mockResolvedValue(mockData),
      findUnique: jest.fn().mockResolvedValue(mockData[0]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificationService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CertificationService>(CertificationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('user_certifications', () => {
    it('should return all certifications for a user', async () => {
      const result = await service.user_certifications(1);
      expect(prisma.certifications.findMany).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('user_certification', () => {
    it('should return a specific certification for a user', async () => {
      const result = await service.user_certification(1, 1);
      expect(prisma.certifications.findUnique).toHaveBeenCalledWith({
        where: { user_id: 1, id: 1 },
      });
      expect(result).toEqual(mockData[0]);
    });

    it('should throw NotFoundException if certification not found', async () => {
      jest
        .spyOn(prisma.certifications, 'findUnique')
        .mockResolvedValueOnce(null);

      await expect(service.user_certification(1, 2)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
