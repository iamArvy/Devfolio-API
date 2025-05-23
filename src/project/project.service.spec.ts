import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { mockArray, mockData, id, uid } from '../data';

describe('ProjectService', () => {
  let service: ProjectService;
  let prisma: PrismaService;

  const mockPrismaService = {
    projects: {
      findMany: jest.fn().mockResolvedValue(mockArray),
      findUnique: jest.fn().mockResolvedValue(mockData),
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
      const result = await service.user_projects(uid);
      expect(prisma.projects.findMany).toHaveBeenCalledWith({
        where: { user_id: uid },
      });
      expect(result).toEqual(mockArray);
    });
  });

  describe('user_project', () => {
    it('should return one project', async () => {
      const result = await service.user_project(uid, id);
      expect(prisma.projects.findUnique).toHaveBeenCalledWith({
        where: mockData,
      });
      expect(result).toEqual(mockData);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(prisma.projects, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.user_project('wid', 'wid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
