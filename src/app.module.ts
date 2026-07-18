import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AgentController } from './agent/agent.controller';
import { AgentModule } from './agent/agent.module';
import { AgentService } from './agent/agent.service';
import { PropertiesService } from './properties/properties.service';
import { PropertiesModule } from './properties/properties.module';
import { S3BucketModule } from './s3-bucket/s3-bucket.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB!),
    DatabaseModule,
    UserModule,
    AgentModule,
    PropertiesModule,
    S3BucketModule],
  controllers: [AppController, UserController, AgentController],
  providers: [AppService, DatabaseService, UserService, AgentService, PropertiesService],
})
export class AppModule { }