import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { Agent } from './schema/agent.schema';
import { Property } from './schema/properties.schema';
import { Enquiry } from './schema/enquiry.schema';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectModel(User.name)
        public readonly userModel: Model<User>,
        @InjectModel(Agent.name)
        public readonly agentModel: Model<Agent>,
        @InjectModel(Property.name)
        public readonly propertyModel: Model<Property>,
        @InjectModel(Enquiry.name)
        public readonly enquiryModel: Model<Enquiry>
    ) { }
}
