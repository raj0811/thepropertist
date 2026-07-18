import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { AgentAuthGuard } from 'src/AuthGuard/agent.AuthGuard';
import { PropertiesService } from './properties.service';
import { DatabaseModule } from 'src/database/database.module';
import { AgentModule } from 'src/agent/agent.module';
import { S3BucketModule } from 'src/s3-bucket/s3-bucket.module';
import { S3BucketService } from 'src/s3-bucket/s3-bucket.service';

@Module({
  imports: [DatabaseModule, AgentModule, S3BucketModule],
  providers: [AgentAuthGuard, PropertiesService, S3BucketService],
  controllers: [PropertiesController]
})
export class PropertiesModule { }
