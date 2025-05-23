import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { StackEntity } from './stack.entity';
import { stacks } from '@prisma/client';
import { StackService } from './stack.service';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver()
export class StackResolver {
  constructor(private readonly stackService: StackService) {}

  @Query(() => [StackEntity], { name: 'stacks' })
  async getStacks(@Context() req: { user: bigint }): Promise<stacks[]> {
    return await this.stackService.user_stacks(req.user);
  }

  @Query(() => StackEntity, { name: 'stacks/:id' })
  async getStack(
    @Context() req: { user: bigint },
    @Args('id') id: bigint,
  ): Promise<stacks> {
    return await this.stackService.user_stack(req.user, id);
  }
}
