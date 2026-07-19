import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { Agent } from './schema/agent.schema';
import { Property } from './schema/properties.schema';
import { Enquiry } from './schema/enquiry.schema';
export declare class DatabaseService {
    readonly userModel: Model<User>;
    readonly agentModel: Model<Agent>;
    readonly propertyModel: Model<Property>;
    readonly enquiryModel: Model<Enquiry>;
    constructor(userModel: Model<User>, agentModel: Model<Agent>, propertyModel: Model<Property>, enquiryModel: Model<Enquiry>);
}
