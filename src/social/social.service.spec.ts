import { Test, TestingModule } from '@nestjs/testing';
import { SocialService } from './social.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('SocialService', () => {
  let service: SocialService;
  let prisma: PrismaService;

  const mockData = [{ id: 1 }];

  const mockPrismaService = {
    socials: {
      findMany: jest.fn().mockResolvedValue(mockData),
      findUnique: jest.fn().mockResolvedValue(mockData[0]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SocialService>(SocialService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('user_socials', () => {
    it('should return all socials for a user', async () => {
      const result = await service.user_socials(1);
      expect(prisma.socials.findMany).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('user_social', () => {
    it('should return one social', async () => {
      const result = await service.user_social(1, 1);
      expect(prisma.socials.findUnique).toHaveBeenCalledWith({
        where: { user_id: 1, id: 1 },
      });
      expect(result).toEqual(mockData[0]);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(prisma.socials, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.user_social(1, 2)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
