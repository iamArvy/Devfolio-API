import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ProjectService', () => {
  let service: ProjectService;
  let prisma: PrismaService;

  const mockData = [{ id: 1 }];

  const mockPrismaService = {
    projects: {
      findMany: jest.fn().mockResolvedValue(mockData),
      findUnique: jest.fn().mockResolvedValue(mockData[0]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('user_projects', () => {
    it('should return all projects for a user', async () => {
      const result = await service.user_projects(1);
      expect(prisma.projects.findMany).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('user_project', () => {
    it('should return one project', async () => {
      const result = await service.user_project(1, 1);
      expect(prisma.projects.findUnique).toHaveBeenCalledWith({
        where: { user_id: 1, id: 1 },
      });
      expect(result).toEqual(mockData[0]);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(prisma.projects, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.user_project(1, 2)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
