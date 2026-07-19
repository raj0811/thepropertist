"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnquiryModule = void 0;
const common_1 = require("@nestjs/common");
const enquiry_service_1 = require("./enquiry.service");
const enquiry_controller_1 = require("./enquiry.controller");
const database_module_1 = require("../database/database.module");
const agent_AuthGuard_1 = require("../AuthGuard/agent.AuthGuard");
const agent_service_1 = require("../agent/agent.service");
let EnquiryModule = class EnquiryModule {
};
exports.EnquiryModule = EnquiryModule;
exports.EnquiryModule = EnquiryModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [enquiry_service_1.EnquiryService, agent_AuthGuard_1.AgentAuthGuard, agent_service_1.AgentService],
        controllers: [enquiry_controller_1.EnquiryController]
    })
], EnquiryModule);
//# sourceMappingURL=enquiry.module.js.map