import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AgentService } from "../agent/agent.service";
export declare class AgentAuthGuard implements CanActivate {
    private readonly agentService;
    constructor(agentService: AgentService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
