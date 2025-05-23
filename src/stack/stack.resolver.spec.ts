import { Test, TestingModule } from '@nestjs/testing';
import { StackResolver } from './stack.resolver';
import { StackService } from './stack.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Reflector } from '@nestjs/core';
import { mockArray, mockData, id, uid, req } from '../data';

describe('StackResolver', () => {
  let resolver: StackResolver;
  let service: StackService;

  const mockService = {
    user_stacks: jest.fn().mockResolvedValue(mockArray),
    user_stack: jest.fn().mockResolvedValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StackResolver,
        { provide: StackService, useValue: mockService },
        Reflector,
      ],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    resolver = module.get<StackResolver>(StackResolver);
    service = module.get<StackService>(StackService);
  });

  it('should return all stacks for a user', async () => {
    const result = await resolver.getStacks(req);
    expect(service.user_stacks).toHaveBeenCalledWith(uid);
    expect(result).toEqual(mockArray);
  });

  it('should return one stack for a user', async () => {
    const result = await resolver.getStack(req, id);
    expect(service.user_stack).toHaveBeenCalledWith(uid, id);
    expect(result).toEqual(mockData);
  });
});
