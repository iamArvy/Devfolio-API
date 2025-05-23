import { Test, TestingModule } from '@nestjs/testing';
import { StackService } from './stack.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { mockArray, mockData, id, uid } from '../data';

describe('StackService', () => {
  let service: StackService;
  let prisma: PrismaService;

  const mockPrismaService = {
    stacks: {
      findMany: jest.fn().mockResolvedValue(mockArray),
      findUnique: jest.fn().mockResolvedValue(mockData),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StackService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<StackService>(StackService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('user_stacks', () => {
    it('should return all stacks for a user', async () => {
      const result = await service.user_stacks(uid);
      expect(prisma.stacks.findMany).toHaveBeenCalledWith({
        where: { user_id: uid },
      });
      expect(result).toEqual(mockArray);
    });
  });

  describe('user_stack', () => {
    it('should return one stack', async () => {
      const result = await service.user_stack(uid, id);
      expect(prisma.stacks.findUnique).toHaveBeenCalledWith({
        where: mockData,
      });
      expect(result).toEqual(mockData);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(prisma.stacks, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.user_stack('wid', 'wid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
