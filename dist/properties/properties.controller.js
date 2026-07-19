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
exports.PropertiesController = void 0;
const common_1 = require("@nestjs/common");
const properties_service_1 = require("./properties.service");
const agent_AuthGuard_1 = require("../AuthGuard/agent.AuthGuard");
const node_crypto_1 = require("node:crypto");
const s3_bucket_service_1 = require("../s3-bucket/s3-bucket.service");
let PropertiesController = class PropertiesController {
    propertiesService;
    s3BucketService;
    constructor(propertiesService, s3BucketService) {
        this.propertiesService = propertiesService;
        this.s3BucketService = s3BucketService;
    }
    createProperty(req, body) {
        return this.propertiesService.createProperty(req.user.id, body.name, body.address, body.listingType, body.carpetArea, body.configuration, body.description, body.estimatedPrice, body.propertyAgeType, body.carpetAreaUnit, body.benefits, body.nearestStation, body.images, body.negotiable, body.propertyAgeInYears, body.googleMapLocation);
    }
    editProperty(propertyId, req, body) {
        return this.propertiesService.editProperty(propertyId, req.user.id, body.name, body.address, body.listingType, body.carpetArea, body.configuration, body.description, body.estimatedPrice, body.propertyAgeType, body.carpetAreaUnit, body.benefits, body.nearestStation, body.images, body.negotiable, body.propertyAgeInYears, body.googleMapLocation);
    }
    async uploadPropertyImage(req, body) {
        if (!body.base64) {
            throw new common_1.BadRequestException("Base64 image is required");
        }
        const dataUrlMatch = body.base64.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
        let contentType;
        let base64Data;
        if (dataUrlMatch) {
            contentType = dataUrlMatch[1];
            base64Data = dataUrlMatch[2];
        }
        else {
            if (!body.contentType) {
                throw new common_1.BadRequestException("Content type is required for raw Base64 images");
            }
            contentType = body.contentType;
            base64Data = body.base64;
        }
        const allowedContentTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];
        if (!allowedContentTypes.includes(contentType)) {
            throw new common_1.BadRequestException("Only JPG, PNG and WebP images are allowed");
        }
        let fileBuffer;
        try {
            fileBuffer = Buffer.from(base64Data, "base64");
        }
        catch {
            throw new common_1.BadRequestException("Invalid Base64 image");
        }
        if (fileBuffer.length === 0) {
            throw new common_1.BadRequestException("The provided image is empty");
        }
        const maximumFileSize = 5 * 1024 * 1024;
        if (fileBuffer.length > maximumFileSize) {
            throw new common_1.BadRequestException("Image size cannot exceed 5 MB");
        }
        const extensionByContentType = {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/webp": "webp",
        };
        const extension = extensionByContentType[contentType];
        const key = `properties/${req.user.id}/` +
            `${(0, node_crypto_1.randomUUID)()}.${extension}`;
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        if (!bucketName) {
            throw new common_1.BadRequestException("AWS_S3_BUCKET_NAME is not configured");
        }
        const url = await this.s3BucketService.uploadToS3(fileBuffer, key, contentType, bucketName);
        return {
            success: true,
            message: "Image uploaded successfully",
            data: {
                key,
                url,
            },
        };
    }
    getAgentProperty(req) {
        return this.propertiesService.getAgentProperties(req.user.id);
    }
    getAllProperties(page, limit, status, bhk, minPrice, maxPrice, location, listingType) {
        return this.propertiesService.getAllProperties(Number(page), Number(limit), status, bhk !== undefined ? Number(bhk) : undefined, minPrice !== undefined
            ? Number(minPrice)
            : undefined, maxPrice !== undefined
            ? Number(maxPrice)
            : undefined, location, listingType);
    }
    getOneProperty(propertyId) {
        return this.propertiesService.getOnePropperty(propertyId);
    }
    deleteProperty(propertyId, req) {
        return this.propertiesService.deleteProperty(propertyId, req.user.id);
    }
};
exports.PropertiesController = PropertiesController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(agent_AuthGuard_1.AgentAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "createProperty", null);
__decorate([
    (0, common_1.Patch)("edit/:propertyId"),
    (0, common_1.UseGuards)(agent_AuthGuard_1.AgentAuthGuard),
    __param(0, (0, common_1.Param)("propertyId")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "editProperty", null);
__decorate([
    (0, common_1.Post)("property-image"),
    (0, common_1.UseGuards)(agent_AuthGuard_1.AgentAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "uploadPropertyImage", null);
__decorate([
    (0, common_1.Get)('agent-properties'),
    (0, common_1.UseGuards)(agent_AuthGuard_1.AgentAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "getAgentProperty", null);
__decorate([
    (0, common_1.Get)('all-properties'),
    __param(0, (0, common_1.Query)("page", new common_1.DefaultValuePipe("1"))),
    __param(1, (0, common_1.Query)("limit", new common_1.DefaultValuePipe("10"))),
    __param(2, (0, common_1.Query)("status")),
    __param(3, (0, common_1.Query)("bhk")),
    __param(4, (0, common_1.Query)("minPrice")),
    __param(5, (0, common_1.Query)("maxPrice")),
    __param(6, (0, common_1.Query)("location")),
    __param(7, (0, common_1.Query)("listingType")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "getAllProperties", null);
__decorate([
    (0, common_1.Get)('/get/:propertyId'),
    __param(0, (0, common_1.Param)("propertyId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "getOneProperty", null);
__decorate([
    (0, common_1.Delete)("delete/:propertyId"),
    (0, common_1.UseGuards)(agent_AuthGuard_1.AgentAuthGuard),
    __param(0, (0, common_1.Param)("propertyId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "deleteProperty", null);
exports.PropertiesController = PropertiesController = __decorate([
    (0, common_1.Controller)('properties'),
    __metadata("design:paramtypes", [properties_service_1.PropertiesService,
        s3_bucket_service_1.S3BucketService])
], PropertiesController);
//# sourceMappingURL=properties.controller.js.map