import { Test, TestingModule } from '@nestjs/testing';
import { StackResolver } from './stack.resolver';
import { StackService } from './stack.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Reflector } from '@nestjs/core';

describe('StackResolver', () => {
  let resolver: StackResolver;
  let service: StackService;

  const mockData = [{ id: 1 }];
  const mockService = {
    user_stacks: jest.fn().mockResolvedValue(mockData),
    user_stack: jest.fn().mockResolvedValue(mockData[0]),
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
    const context = { user: 1 };
    const result = await resolver.getStacks(context);
    expect(service.user_stacks).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });

  it('should return one stack for a user', async () => {
    const context = { user: 1 };
    const result = await resolver.getStack(context, 1);
    expect(service.user_stack).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockData[0]);
  });
});
