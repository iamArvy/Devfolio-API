import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { StackEntity } from './stack.entity';
import { stacks } from '@prisma/client';
import { StackService } from './stack.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver()
export class StackResolver {
  constructor(private readonly stackService: StackService) {}

  @Query(() => [StackEntity], { name: 'stacks' })
  async getStacks(@Context() req: { user: number }): Promise<stacks[]> {
    return await this.stackService.user_stacks(req.user);
  }

  @Query(() => StackEntity, { name: 'stack' })
  async getStack(
    @Context() req: { user: number },
    @Args('id') id: number,
  ): Promise<stacks> {
    return await this.stackService.user_stack(req.user, id);
  }
}
