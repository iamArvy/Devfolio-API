import { Controller, Get, Param, Req } from '@nestjs/common';
import { StackService } from './stack.service';
import { stacks } from '@prisma/client';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Stacks')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@Controller('stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @Get('stacks')
  async getStacks(@Req() req: { user: bigint }): Promise<stacks[]> {
    return await this.stackService.user_stacks(req.user);
  }

  @Get('stacks/:id')
  async getStack(
    @Req() req: { user: bigint },
    @Param('id') id: bigint,
  ): Promise<stacks> {
    return await this.stackService.user_stack(req.user, id);
  }
}
