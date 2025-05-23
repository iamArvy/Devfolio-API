import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceService } from './experience.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ExperienceService', () => {
  let service: ExperienceService;
  let prisma: PrismaService;

  const mockData = [{ id: 1 }];

  const mockPrismaService = {
    experiences: {
      findMany: jest.fn().mockResolvedValue(mockData),
      findUnique: jest.fn().mockResolvedValue(mockData[0]),
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
      const result = await service.user_experiences(1);
      expect(prisma.experiences.findMany).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('user_experience', () => {
    it('should return one experience', async () => {
      const result = await service.user_experience(1, 1);
      expect(prisma.experiences.findUnique).toHaveBeenCalledWith({
        where: { user_id: 1, id: 1 },
      });
      expect(result).toEqual(mockData[0]);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(prisma.experiences, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.user_experience(1, 2)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
