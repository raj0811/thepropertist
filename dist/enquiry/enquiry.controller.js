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
exports.EnquiryController = void 0;
const common_1 = require("@nestjs/common");
const enquiry_service_1 = require("./enquiry.service");
const agent_AuthGuard_1 = require("../AuthGuard/agent.AuthGuard");
let EnquiryController = class EnquiryController {
    enquiriesService;
    constructor(enquiriesService) {
        this.enquiriesService = enquiriesService;
    }
    raiseEnquiry(body) {
        console.log(body.enquiryType, 'enquiryType');
        return this.enquiriesService
            .raisePropertyEnquiry(body.name, body.email, body.number, body.enquiryType, body.listingType, body.propertyId, body.budget, body.preferredArea, body.movingInTime, body.message);
    }
    getAgentEnquiries(req, page, limit) {
        return this.enquiriesService.getAgentEnquiries(req.user.id, Number(page), Number(limit));
    }
};
exports.EnquiryController = EnquiryController;
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EnquiryController.prototype, "raiseEnquiry", null);
__decorate([
    (0, common_1.Get)("agent-enquiries"),
    (0, common_1.UseGuards)(agent_AuthGuard_1.AgentAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("page", new common_1.DefaultValuePipe("1"))),
    __param(2, (0, common_1.Query)("limit", new common_1.DefaultValuePipe("10"))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], EnquiryController.prototype, "getAgentEnquiries", null);
exports.EnquiryController = EnquiryController = __decorate([
    (0, common_1.Controller)("enquiries"),
    __metadata("design:paramtypes", [enquiry_service_1.EnquiryService])
], EnquiryController);
//# sourceMappingURL=enquiry.controller.js.map