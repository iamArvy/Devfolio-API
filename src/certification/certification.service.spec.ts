import { Test, TestingModule } from '@nestjs/testing';
import { CertificationService } from './certification.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { id, mockArray, mockData, uid } from '../data';

describe('CertificationService', () => {
  let service: CertificationService;
  let prisma: PrismaService;

  const mockPrismaService = {
    certifications: {
      findMany: jest.fn().mockResolvedValue(mockArray),
      findUnique: jest.fn().mockResolvedValue(mockData),
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
      const result = await service.user_certifications(uid);
      expect(prisma.certifications.findMany).toHaveBeenCalledWith({
        where: { user_id: uid },
      });
      expect(result).toEqual(mockArray);
    });
  });

  describe('user_certification', () => {
    it('should return a specific certification for a user', async () => {
      const result = await service.user_certification(uid, id);
      expect(prisma.certifications.findUnique).toHaveBeenCalledWith({
        where: mockData,
      });
      expect(result).toEqual(mockData);
    });

    it('should throw NotFoundException if certification not found', async () => {
      jest
        .spyOn(prisma.certifications, 'findUnique')
        .mockResolvedValueOnce(null);

      await expect(service.user_certification(2, 'wrongcid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
