"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const agent_service_1 = require("../agent/agent.service");
let AgentAuthGuard = class AgentAuthGuard {
    agentService;
    constructor(agentService) {
        this.agentService = agentService;
    }
    async canActivate(context) {
        console.log("GUARD HIT");
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            console.log("NO AUTH HEADER");
            throw new common_1.UnauthorizedException('No token provided');
        }
        const token = authHeader.split(' ')[1];
        try {
            const validateToken = await this.agentService.verifyAgentToken(token);
            request.user = validateToken;
            console.log("GUARD PASS");
            return true;
        }
        catch (err) {
            console.log("TOKEN ERROR:", err);
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.AgentAuthGuard = AgentAuthGuard;
exports.AgentAuthGuard = AgentAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [agent_service_1.AgentService])
], AgentAuthGuard);
//# sourceMappingURL=agent.AuthGuard.js.map