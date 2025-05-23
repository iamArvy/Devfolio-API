import { Test, TestingModule } from '@nestjs/testing';
import { StackService } from './stack.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('StackService', () => {
  let service: StackService;
  let prisma: PrismaService;

  const mockData = [{ id: 1 }];

  const mockPrismaService = {
    stacks: {
      findMany: jest.fn().mockResolvedValue(mockData),
      findUnique: jest.fn().mockResolvedValue(mockData[0]),
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
      const result = await service.user_stacks(1);
      expect(prisma.stacks.findMany).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('user_stack', () => {
    it('should return one stack', async () => {
      const result = await service.user_stack(1, 1);
      expect(prisma.stacks.findUnique).toHaveBeenCalledWith({
        where: { user_id: 1, id: 1 },
      });
      expect(result).toEqual(mockData[0]);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(prisma.stacks, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.user_stack(1, 2)).rejects.toThrow(NotFoundException);
    });
  });
});
