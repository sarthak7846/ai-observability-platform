import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { UserPayload } from 'src/common/interfaces/user-payload.interface';

@Controller('organization')
@UseGuards(JwtAuthGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get(':id')
  async getOrganizationById(
    @Param('id') id: string,
    @User() user: UserPayload,
  ) {
    return this.organizationService.getOrganizationById(id, user.sub);
  }
}
