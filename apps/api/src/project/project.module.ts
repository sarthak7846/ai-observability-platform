import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { OrganizationModule } from 'src/organization/organization.module';
import { ProjectController } from './project.controller';
import { MembershipModule } from 'src/membership/membership.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [
    forwardRef(() => OrganizationModule),
    MembershipModule,
    KafkaModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
