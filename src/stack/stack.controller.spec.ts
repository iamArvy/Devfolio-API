import { Test, TestingModule } from '@nestjs/testing';
import { StackController } from './stack.controller';
import { StackService } from './stack.service';
import { mockArray, mockData, id, uid, req } from '../data';

describe('StackController', () => {
  let controller: StackController;
  let service: StackService;

  const mockService = {
    user_stacks: jest.fn().mockResolvedValue(mockArray),
    user_stack: jest.fn().mockResolvedValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StackController],
      providers: [{ provide: StackService, useValue: mockService }],
    }).compile();

    controller = module.get<StackController>(StackController);
    service = module.get<StackService>(StackService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all stacks for a user', async () => {
    const result = await controller.getStacks(req);
    expect(service.user_stacks).toHaveBeenCalledWith(uid);
    expect(result).toEqual(mockArray);
  });

  it('should return one stack for a user', async () => {
    const result = await controller.getStack(req, id);
    expect(service.user_stack).toHaveBeenCalledWith(uid, id);
    expect(result).toEqual(mockData);
  });
});
