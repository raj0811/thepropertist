import { Module } from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { EnquiryController } from './enquiry.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AgentAuthGuard } from 'src/AuthGuard/agent.AuthGuard';
import { AgentService } from 'src/agent/agent.service';


@Module({
  imports: [DatabaseModule],
  providers: [EnquiryService, AgentAuthGuard, AgentService],
  controllers: [EnquiryController]
})
export class EnquiryModule { }
