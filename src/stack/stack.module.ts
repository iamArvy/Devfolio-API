import { Module } from '@nestjs/common';
import { StackService } from './stack.service';
import { StackController } from './stack.controller';
import { StackResolver } from './stack.resolver';

@Module({
  controllers: [StackController],
  providers: [StackService, StackResolver],
})
export class StackModule {}
