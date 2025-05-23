import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ProfileService', () => {
  let service: ProfileService;
  let prisma: PrismaService;

  const mockProfile = { id: 1 };

  const mockPrismaService = {
    profiles: {
      findUnique: jest.fn().mockResolvedValue(mockProfile),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('user_profile', () => {
    it('should return the user profile', async () => {
      const result = await service.user_profile(1);
      expect(prisma.profiles.findUnique).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
      expect(result).toEqual(mockProfile);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(prisma.profiles, 'findUnique').mockResolvedValueOnce(null);
      await expect(service.user_profile(2)).rejects.toThrow(NotFoundException);
    });
  });
});
