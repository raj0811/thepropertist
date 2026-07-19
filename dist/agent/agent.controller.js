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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentController = void 0;
const common_1 = require("@nestjs/common");
const agent_service_1 = require("./agent.service");
const agent_AuthGuard_1 = require("../AuthGuard/agent.AuthGuard");
const dto_1 = require("../utils/dto");
let AgentController = class AgentController {
    agentService;
    constructor(agentService) {
        this.agentService = agentService;
    }
    async registerAgent(body) {
        const { name, email, phone, address, localities, experience, password, photo, certifications, expertise, bio } = body;
        return this.agentService.registerAgent(name, email, phone, address, localities, experience, password, photo, certifications, expertise, bio);
    }
    async loginAgent(body) {
        return this.agentService.loginAgent(body.email, body.password);
    }
    async getAgent(req) {
        const id = req.user.id;
        return this.agentService.getAgent(id);
    }
};
exports.AgentController = AgentController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AgentController.prototype, "registerAgent", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AgentLoginDto]),
    __metadata("design:returntype", Promise)
], AgentController.prototype, "loginAgent", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(agent_AuthGuard_1.AgentAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AgentController.prototype, "getAgent", null);
exports.AgentController = AgentController = __decorate([
    (0, common_1.Controller)('agent'),
    __metadata("design:paramtypes", [agent_service_1.AgentService])
], AgentController);
//# sourceMappingURL=agent.controller.js.map