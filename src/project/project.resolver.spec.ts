import { Test, TestingModule } from '@nestjs/testing';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Reflector } from '@nestjs/core';

describe('ProjectResolver', () => {
  let resolver: ProjectResolver;
  let service: ProjectService;

  const mockData = [{ id: 1 }];
  const mockService = {
    user_projects: jest.fn().mockResolvedValue(mockData),
    user_project: jest.fn().mockResolvedValue(mockData[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectResolver,
        { provide: ProjectService, useValue: mockService },
        Reflector,
      ],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    resolver = module.get<ProjectResolver>(ProjectResolver);
    service = module.get<ProjectService>(ProjectService);
  });

  it('should return all projects for a user', async () => {
    const context = { user: 1 };
    const result = await resolver.getProjects(context);
    expect(service.user_projects).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });

  it('should return one project for a user', async () => {
    const context = { user: 1 };
    const result = await resolver.getProject(context, 1);
    expect(service.user_project).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockData[0]);
  });
});
