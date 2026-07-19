import { AgentService } from './agent.service';
import { Certification } from "../database/schema/agent.schema";
import { AgentLoginDto } from "../utils/dto";
export declare class AgentController {
    private readonly agentService;
    constructor(agentService: AgentService);
    registerAgent(body: {
        name: string;
        email: string;
        phone: string;
        address: string;
        localities: string[];
        experience: number;
        password: string;
        photo?: string;
        certifications?: Certification[];
        expertise?: string[];
        bio?: string;
    }): Promise<{
        msg: string;
        token: any;
    }>;
    loginAgent(body: AgentLoginDto): Promise<{
        msg: string;
        token: any;
    }>;
    getAgent(req: any): Promise<import("mongoose").Document<unknown, {}, import("src/database/schema/agent.schema").Agent, {}, import("mongoose").DefaultSchemaOptions> & import("src/database/schema/agent.schema").Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
