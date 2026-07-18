import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AgentService } from 'src/agent/agent.service';

@Injectable()
export class AgentAuthGuard implements CanActivate {
    constructor(
        private readonly agentService: AgentService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("GUARD HIT");

        const request: any = context.switchToHttp().getRequest<Request>();

        const authHeader = request.headers.authorization;
        console.log("AUTH HEADER:", authHeader);

        if (!authHeader) {
            console.log("NO AUTH HEADER");
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader.split(' ')[1];
        console.log("TOKEN:", token);

        try {
            const validateToken = await this.agentService.verifyAgentToken(token);
            console.log("VALID TOKEN:", validateToken);

            request.user = validateToken;

            console.log("GUARD PASS");
            return true;

        } catch (err) {
            console.log("TOKEN ERROR:", err);
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}