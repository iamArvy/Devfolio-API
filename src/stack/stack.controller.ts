import { Controller, Get, Param, Req } from '@nestjs/common';
import { StackService } from './stack.service';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { StackResponse } from './stack.response'; // adjust path as needed

@ApiTags('Stacks')
@ApiSecurity('client-id')
@ApiSecurity('client-secret')
@Controller('stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @ApiOkResponse({ type: [StackResponse] })
  @Get('')
  async getStacks(@Req() req: { user: number }) {
    return await this.stackService.user_stacks(req.user);
  }

  @ApiOkResponse({ type: StackResponse })
  @Get(':id')
  async getStack(@Req() req: { user: number }, @Param('id') id: string) {
    return await this.stackService.user_stack(req.user, id);
  }
}
