import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  const mockData = [{ id: 1 }];
  const mockService = {
    user_projects: jest.fn().mockResolvedValue(mockData),
    user_project: jest.fn().mockResolvedValue(mockData[0]),
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
    const req = { user: 1 };
    const result = await controller.getProjects(req);
    expect(service.user_projects).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });

  it('should return one project for a user', async () => {
    const req = { user: 1 };
    const result = await controller.getProject(req, 1);
    expect(service.user_project).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockData[0]);
  });
});
