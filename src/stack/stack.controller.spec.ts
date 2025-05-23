import { Test, TestingModule } from '@nestjs/testing';
import { StackController } from './stack.controller';
import { StackService } from './stack.service';

describe('StackController', () => {
  let controller: StackController;
  let service: StackService;

  const mockData = [{ id: 1 }];
  const mockService = {
    user_stacks: jest.fn().mockResolvedValue(mockData),
    user_stack: jest.fn().mockResolvedValue(mockData[0]),
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
    const req = { user: 1 };
    const result = await controller.getStacks(req);
    expect(service.user_stacks).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });

  it('should return one stack for a user', async () => {
    const req = { user: 1 };
    const result = await controller.getStack(req, 1);
    expect(service.user_stack).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockData[0]);
  });
});
