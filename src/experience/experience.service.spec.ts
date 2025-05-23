import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceService } from './experience.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { mockArray, mockData, id, uid } from '../data';

describe('ExperienceService', () => {
  let service: ExperienceService;
  let prisma: PrismaService;

  const mockPrismaService = {
    experiences: {
      findMany: jest.fn().mockResolvedValue(mockArray),
      findUnique: jest.fn().mockResolvedValue(mockData),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperienceService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ExperienceService>(ExperienceService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('user_experiences', () => {
    it('should return all experiences for a user', async () => {
      const result = await service.user_experiences(uid);
      expect(prisma.experiences.findMany).toHaveBeenCalledWith({
        where: { user_id: uid },
      });
      expect(result).toEqual(mockArray);
    });
  });

  describe('user_experience', () => {
    it('should return one experience', async () => {
      const result = await service.user_experience(uid, id);
      expect(prisma.experiences.findUnique).toHaveBeenCalledWith({
        where: mockData,
      });
      expect(result).toEqual(mockData);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(prisma.experiences, 'findUnique').mockResolvedValueOnce(null);

      await expect(
        service.user_experience('wronguid', 'wrongeid'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
