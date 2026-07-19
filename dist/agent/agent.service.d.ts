import { DatabaseService } from "../database/database.service";
import { Certification } from "../database/schema/agent.schema";
export declare class AgentService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    registerAgent(name: string, email: string, phone: string, address: string, localities: string[], experience: number, password: string, photo?: string, certifications?: Certification[], expertise?: string[], bio?: string): Promise<{
        msg: string;
        token: any;
    }>;
    loginAgent(email: string, password: string): Promise<{
        msg: string;
        token: any;
    }>;
    getAgent(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/database/schema/agent.schema").Agent, {}, import("mongoose").DefaultSchemaOptions> & import("src/database/schema/agent.schema").Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    verifyAgentToken(token: string): Promise<any>;
}
