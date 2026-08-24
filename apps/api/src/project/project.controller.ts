import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import {
  CreateAPIKeyDto,
  CreateProjectDto,
  CreateTraceDto,
} from './project.dto';
import { User } from 'src/auth/user.decorator';
import { UserPayload } from 'src/common/interfaces/user-payload.interface';
import { APIKeyGuard } from 'src/common/guards/api-key.guard';
import { Public } from 'src/auth/public.decorator';
import { APIKeyPayload } from './types/api-key.interface';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(
    @Body() dto: CreateProjectDto,
    @User() user: UserPayload,
  ) {
    return this.projectService.createProject(dto, user.sub);
  }

  @Post(':id/api-key')
  async createAPIKey(
    @Param('id') projectId: string,
    @User() user: UserPayload,
    @Body() body: CreateAPIKeyDto,
  ) {
    return this.projectService.createAPIKey(projectId, user.sub, body.name);
  }

  @Get(':id/api-key')
  async getAllAPIKeys(
    @Param('id') projectId: string,
    @User() user: UserPayload,
  ) {
    return this.projectService.getAllAPIKeys(projectId, user.sub);
  }

  @Post('trace')
  @Public()
  @UseGuards(APIKeyGuard)
  trace(
    @Req()
    request: {
      apiKey: APIKeyPayload;
    },
    @Body() createTraceDto: CreateTraceDto,
  ) {
    return this.projectService.createTrace(createTraceDto, request.apiKey);
  }
}
