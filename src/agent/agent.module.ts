import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { DatabaseModule } from 'src/database/database.module';
import { AgentAuthGuard } from 'src/AuthGuard/agent.AuthGuard';

@Module({
  imports: [DatabaseModule],
  providers: [AgentService, AgentAuthGuard],
  exports: [AgentService]
})
export class AgentModule { }
