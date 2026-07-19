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
exports.EnquiryService = void 0;
const common_1 = require("@nestjs/common");
const enquiry_schema_1 = require("../database/schema/enquiry.schema");
const database_service_1 = require("../database/database.service");
const mongoose_1 = require("mongoose");
let EnquiryService = class EnquiryService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async raisePropertyEnquiry(name, email, number, enquiryType, listingType, propertyId, budget, preferredArea, movingInTime, message) {
        try {
            if (!Object.values(enquiry_schema_1.EnquiryType).includes(enquiryType)) {
                console.log(enquiryType, 'eee');
                throw new common_1.BadRequestException("Invalid enquiry type");
            }
            const normalizedEmail = email
                .trim()
                .toLowerCase();
            const normalizedPhone = number.trim();
            if (enquiryType === enquiry_schema_1.EnquiryType.PROPERTY) {
                if (!propertyId?.trim()) {
                    throw new common_1.BadRequestException("Property ID is required for a property enquiry");
                }
                console.log(propertyId, 'propertyId');
                const property = await this.databaseService.propertyModel
                    .findOne({
                    _id: new mongoose_1.Types.ObjectId(propertyId),
                })
                    .select("_id propertyId agentId status")
                    .lean();
                if (!property) {
                    throw new common_1.NotFoundException("Property not found");
                }
                const enquiry = await this.databaseService.enquiryModel.create({
                    name: name.trim(),
                    email: normalizedEmail,
                    phone: normalizedPhone,
                    enquiryType: enquiry_schema_1.EnquiryType.PROPERTY,
                    propertyMongoId: property._id,
                    agentId: property.agentId,
                    budget,
                    preferredArea: preferredArea?.trim(),
                    movingInTime,
                    message: message?.trim(),
                });
                return {
                    success: true,
                    message: "Property enquiry submitted successfully",
                    data: enquiry,
                };
            }
            const enquiry = await this.databaseService.enquiryModel.create({
                name: name.trim(),
                email: normalizedEmail,
                phone: normalizedPhone,
                enquiryType: enquiry_schema_1.EnquiryType.GENERAL,
                listingType,
                propertyMongoId: null,
                agentId: null,
                budget,
                preferredArea: preferredArea?.trim(),
                movingInTime,
                message: message?.trim(),
            });
            return {
                success: true,
                message: "General enquiry submitted successfully",
                data: enquiry,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error instanceof Error &&
                error.name === "ValidationError") {
                throw new common_1.BadRequestException(error.message);
            }
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException("Unable to submit enquiry");
        }
    }
    async getAgentEnquiries(agentId, page = 1, limit = 10) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(agentId)) {
                throw new common_1.BadRequestException("Invalid agent ID");
            }
            const currentPage = Math.max(Number(page) || 1, 1);
            const pageLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);
            const skip = (currentPage - 1) * pageLimit;
            const filter = {
                agentId: new mongoose_1.Types.ObjectId(agentId),
            };
            const [enquiries, totalEnquiries] = await Promise.all([
                this.databaseService.enquiryModel
                    .find(filter)
                    .populate({
                    path: "propertyMongoId",
                    select: [
                        "propertyId",
                        "name",
                        "images",
                        "listingType",
                        "configuration",
                        "estimatedPrice",
                        "status",
                        "address",
                    ].join(" "),
                })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(pageLimit)
                    .lean(),
                this.databaseService.enquiryModel
                    .countDocuments(filter),
            ]);
            const totalPages = Math.ceil(totalEnquiries / pageLimit);
            return {
                success: true,
                message: "Agent enquiries fetched successfully",
                data: enquiries,
                pagination: {
                    page: currentPage,
                    limit: pageLimit,
                    totalEnquiries,
                    totalPages,
                    hasNextPage: currentPage < totalPages,
                    hasPreviousPage: currentPage > 1,
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error instanceof Error
                ? error.message
                : "Failed to fetch enquiries");
        }
    }
};
exports.EnquiryService = EnquiryService;
exports.EnquiryService = EnquiryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], EnquiryService);
//# sourceMappingURL=enquiry.service.js.map