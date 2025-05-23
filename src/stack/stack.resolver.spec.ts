import { Test, TestingModule } from '@nestjs/testing';
import { StackResolver } from './stack.resolver';

describe('StackResolver', () => {
  let resolver: StackResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StackResolver],
    }).compile();

    resolver = module.get<StackResolver>(StackResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
