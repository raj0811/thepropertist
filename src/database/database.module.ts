import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { DatabaseService } from './database.service';
import { AgentSchema, Agent } from './schema/agent.schema';
import { Property, PropertySchema } from './schema/properties.schema';
import { Enquiry, EnquirySchema } from './schema/enquiry.schema';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Agent.name, schema: AgentSchema },
            { name: Property.name, schema: PropertySchema },
            { name: Enquiry.name, schema: EnquirySchema }
        ])
    ],
    providers: [DatabaseService],
    exports: [
        MongooseModule,
        DatabaseService
    ]
})
export class DatabaseModule { }
