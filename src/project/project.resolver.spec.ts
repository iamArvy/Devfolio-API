import { Test, TestingModule } from '@nestjs/testing';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Reflector } from '@nestjs/core';
import { mockArray, mockData, id, uid, req } from '../data';

describe('ProjectResolver', () => {
  let resolver: ProjectResolver;
  let service: ProjectService;

  const mockService = {
    user_projects: jest.fn().mockResolvedValue(mockArray),
    user_project: jest.fn().mockResolvedValue(mockData),
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
    const result = await resolver.getProjects(req);
    expect(service.user_projects).toHaveBeenCalledWith(uid);
    expect(result).toEqual(mockArray);
  });

  it('should return one project for a user', async () => {
    const result = await resolver.getProject(req, id);
    expect(service.user_project).toHaveBeenCalledWith(uid, id);
    expect(result).toEqual(mockData);
  });
});
