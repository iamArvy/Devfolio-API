import { Test, TestingModule } from '@nestjs/testing';
import { SocialService } from './social.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { mockArray, mockData, id, uid, req } from '../data';

describe('SocialService', () => {
  let service: SocialService;
  let prisma: PrismaService;

  const mockPrismaService = {
    socials: {
      findMany: jest.fn().mockResolvedValue(mockArray),
      findUnique: jest.fn().mockResolvedValue(mockData),
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
      const result = await service.user_socials(uid);
      expect(prisma.socials.findMany).toHaveBeenCalledWith({
        where: { user_id: uid },
      });
      expect(result).toEqual(mockArray);
    });
  });

  describe('user_social', () => {
    it('should return one social', async () => {
      const result = await service.user_social(uid, id);
      expect(prisma.socials.findUnique).toHaveBeenCalledWith({
        where: mockData,
      });
      expect(result).toEqual(mockData);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(prisma.socials, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.user_social(2, 'wid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
