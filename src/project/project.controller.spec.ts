import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { mockArray, mockData, id, uid, req } from '../data';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  const mockService = {
    user_projects: jest.fn().mockResolvedValue(mockArray),
    user_project: jest.fn().mockResolvedValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [{ provide: ProjectService, useValue: mockService }],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all projects for a user', async () => {
    const result = await controller.getProjects(req);
    expect(service.user_projects).toHaveBeenCalledWith(uid);
    expect(result).toEqual(mockArray);
  });

  it('should return one project for a user', async () => {
    const result = await controller.getProject(req, id);
    expect(service.user_project).toHaveBeenCalledWith(uid, id);
    expect(result).toEqual(mockData);
  });
});
