import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { MembershipModule } from 'src/membership/membership.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [MembershipModule, ProjectModule],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
