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
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const database_service_1 = require("../database/database.service");
const properties_schema_1 = require("../database/schema/properties.schema");
let PropertiesService = class PropertiesService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async createProperty(agentMongoId, name, address, listingType, carpetArea, configuration, description, estimatedPrice, propertyAgeType, carpetAreaUnit, benefits, nearestStation, images, negotiable, propertyAgeInYears, googleMapLocation) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(agentMongoId)) {
                throw new common_1.BadRequestException("Invalid agent ID");
            }
            if (propertyAgeType === properties_schema_1.PropertyAgeType.EXISTING &&
                propertyAgeInYears === undefined) {
                throw new common_1.BadRequestException("Property age in years is required for an existing property");
            }
            const agentObjectId = new mongoose_1.Types.ObjectId(agentMongoId);
            const agentExists = await this.databaseService.agentModel.exists({
                _id: agentObjectId,
            });
            if (!agentExists) {
                throw new common_1.NotFoundException("Agent not found");
            }
            const normalizedAddress = {
                address: address.address.trim(),
                city: address.city.trim(),
                state: address.state.trim(),
                pincode: address.pincode.trim(),
            };
            const property = await this.databaseService.propertyModel.create({
                name: name.trim(),
                city: normalizedAddress.city,
                address: normalizedAddress,
                agentId: agentObjectId,
                listingType,
                carpetArea,
                carpetAreaUnit: carpetAreaUnit ?? "SQ_FT",
                configuration: configuration
                    .trim()
                    .toUpperCase(),
                benefits: benefits ?? [],
                nearestStation,
                description: description.trim(),
                images: images ?? [],
                estimatedPrice,
                negotiable: negotiable ?? false,
                propertyAgeType,
                propertyAgeInYears,
                googleMapLocation,
            });
            return {
                success: true,
                message: "Property created successfully",
                data: property,
            };
        }
        catch (error) {
            console.log(error);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (typeof error === "object" &&
                error !== null &&
                "code" in error &&
                error.code === 11000) {
                throw new common_1.ConflictException("Property already exists");
            }
            if (error instanceof Error &&
                error.name === "ValidationError") {
                throw new common_1.BadRequestException(error.message);
            }
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException("Unable to create property");
        }
    }
    async editProperty(propertyId, agentMongoId, name, address, listingType, carpetArea, configuration, description, estimatedPrice, propertyAgeType, carpetAreaUnit, benefits, nearestStation, images, negotiable, propertyAgeInYears, googleMapLocation) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(agentMongoId)) {
                throw new common_1.BadRequestException("Invalid agent ID");
            }
            console.log({
                propertyId, agentMongoId
            });
            const property = await this.databaseService.propertyModel.findOne({
                _id: new mongoose_1.Types.ObjectId(propertyId),
                agentId: new mongoose_1.Types.ObjectId(agentMongoId),
            });
            if (!property) {
                throw new common_1.NotFoundException("Property not found or you are not authorized to edit it");
            }
            if (name !== undefined) {
                property.name = name.trim();
            }
            if (address !== undefined) {
                property.address = {
                    address: address.address.trim(),
                    city: address.city.trim(),
                    state: address.state.trim(),
                    pincode: address.pincode.trim(),
                };
                property.city = address.city.trim();
            }
            if (listingType !== undefined) {
                property.listingType = listingType;
            }
            if (carpetArea !== undefined) {
                property.carpetArea = carpetArea;
            }
            if (configuration !== undefined) {
                property.configuration = configuration
                    .trim()
                    .toUpperCase();
            }
            if (description !== undefined) {
                property.description = description.trim();
            }
            if (estimatedPrice !== undefined) {
                property.estimatedPrice = estimatedPrice;
            }
            if (carpetAreaUnit !== undefined) {
                property.carpetAreaUnit = carpetAreaUnit;
            }
            if (benefits !== undefined) {
                property.benefits = benefits;
            }
            if (nearestStation !== undefined) {
                property.nearestStation = nearestStation;
            }
            if (images !== undefined) {
                property.images = images;
            }
            if (negotiable !== undefined) {
                property.negotiable = negotiable;
            }
            if (googleMapLocation !== undefined) {
                property.googleMapLocation =
                    googleMapLocation;
            }
            if (propertyAgeType !== undefined) {
                property.propertyAgeType = propertyAgeType;
                if (propertyAgeType !== properties_schema_1.PropertyAgeType.EXISTING) {
                    property.propertyAgeInYears = undefined;
                }
            }
            if (propertyAgeInYears !== undefined) {
                property.propertyAgeInYears =
                    propertyAgeInYears;
            }
            if (property.propertyAgeType ===
                properties_schema_1.PropertyAgeType.EXISTING &&
                property.propertyAgeInYears === undefined) {
                throw new common_1.BadRequestException("Property age in years is required for an existing property");
            }
            await property.save();
            return {
                success: true,
                message: "Property updated successfully",
                data: property,
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
            throw new common_1.BadRequestException("Unable to update property");
        }
    }
    async getAgentProperties(agentId, page = 1, limit = 10) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(agentId)) {
                throw new common_1.BadRequestException("Invalid agent ID");
            }
            const currentPage = Math.max(Number(page) || 1, 1);
            const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 100);
            const skip = (currentPage - 1) * pageSize;
            const filter = {
                agentId: new mongoose_1.Types.ObjectId(agentId),
            };
            const [properties, totalProperties] = await Promise.all([
                this.databaseService.propertyModel
                    .find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(pageSize)
                    .lean(),
                this.databaseService.propertyModel.countDocuments(filter),
            ]);
            const totalPages = Math.ceil(totalProperties / pageSize);
            return {
                success: true,
                message: "Agent properties fetched successfully",
                data: properties,
                pagination: {
                    page: currentPage,
                    limit: pageSize,
                    totalProperties,
                    totalPages,
                    hasNextPage: currentPage < totalPages,
                    hasPreviousPage: currentPage > 1,
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException("Unable to fetch agent properties");
        }
    }
    async getAllProperties(page = 1, limit = 10, status, bhk, minPrice, maxPrice, location, listingType) {
        try {
            const currentPage = Math.max(Number(page) || 1, 1);
            const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 100);
            if (minPrice !== undefined &&
                maxPrice !== undefined &&
                minPrice > maxPrice) {
                throw new common_1.BadRequestException("Minimum price cannot be greater than maximum price");
            }
            const filter = {};
            if (status) {
                const normalizedStatus = status.toUpperCase();
                if (!Object.values(properties_schema_1.PropertyStatus).includes(normalizedStatus)) {
                    throw new common_1.BadRequestException("Invalid property status");
                }
                filter.status = normalizedStatus;
            }
            else {
                filter.status = properties_schema_1.PropertyStatus.AVAILABLE;
            }
            if (bhk !== undefined) {
                const bhkNumber = Number(bhk);
                if (!Number.isInteger(bhkNumber) ||
                    bhkNumber < 1 ||
                    bhkNumber > 20) {
                    throw new common_1.BadRequestException("BHK must be between 1 and 20");
                }
                filter.configuration = `${bhkNumber}BHK`;
            }
            if (minPrice !== undefined ||
                maxPrice !== undefined) {
                filter.estimatedPrice = {};
                if (minPrice !== undefined) {
                    if (Number(minPrice) < 0) {
                        throw new common_1.BadRequestException("Minimum price cannot be negative");
                    }
                    filter.estimatedPrice.$gte = Number(minPrice);
                }
                if (maxPrice !== undefined) {
                    if (Number(maxPrice) < 0) {
                        throw new common_1.BadRequestException("Maximum price cannot be negative");
                    }
                    filter.estimatedPrice.$lte = Number(maxPrice);
                }
            }
            if (listingType) {
                const normalizedListingType = listingType.toUpperCase();
                if (!Object.values(properties_schema_1.ListingType).includes(normalizedListingType)) {
                    throw new common_1.BadRequestException("Listing type must be RENT, SELL or LEASE");
                }
                filter.listingType = normalizedListingType;
            }
            if (location?.trim()) {
                const escapedLocation = location
                    .trim()
                    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                const locationRegex = new RegExp(escapedLocation, "i");
                filter.$or = [
                    { city: locationRegex },
                    { "address.city": locationRegex },
                    { "address.address": locationRegex },
                    { "address.state": locationRegex },
                    { "address.pincode": locationRegex },
                ];
            }
            const skip = (currentPage - 1) * pageSize;
            const [properties, totalProperties] = await Promise.all([
                this.databaseService.propertyModel
                    .find(filter)
                    .populate("agentId", "agentId name email phone photo")
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(pageSize)
                    .lean(),
                this.databaseService.propertyModel.countDocuments(filter),
            ]);
            const totalPages = Math.ceil(totalProperties / pageSize);
            return {
                success: true,
                message: "Properties fetched successfully",
                data: properties,
                filters: {
                    status: status ?? properties_schema_1.PropertyStatus.AVAILABLE,
                    bhk: bhk ?? null,
                    minPrice: minPrice ?? null,
                    maxPrice: maxPrice ?? null,
                    location: location ?? null,
                    listingType: listingType ?? null,
                },
                pagination: {
                    page: currentPage,
                    limit: pageSize,
                    totalProperties,
                    totalPages,
                    hasNextPage: currentPage < totalPages,
                    hasPreviousPage: currentPage > 1,
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException("Unable to fetch properties");
        }
    }
    async getOnePropperty(propertyId) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(propertyId)) {
                throw new common_1.BadRequestException("Invalid property ID");
            }
            const property = await this.databaseService.propertyModel
                .findById(propertyId)
                .populate("agentId", "agentId name email phone photo")
                .lean();
            if (!property) {
                throw new common_1.BadRequestException("Property not found");
            }
            return {
                success: true,
                message: "Property fetched successfully",
                data: property,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException("Unable to fetch property");
        }
    }
    async deleteProperty(propertyId, agentId) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(propertyId)) {
                throw new common_1.BadRequestException("Invalid property ID");
            }
            if (!mongoose_1.Types.ObjectId.isValid(agentId)) {
                throw new common_1.BadRequestException("Invalid agent ID");
            }
            const property = await this.databaseService.propertyModel
                .findOneAndDelete({
                _id: new mongoose_1.Types.ObjectId(propertyId),
                agentId: new mongoose_1.Types.ObjectId(agentId),
            })
                .lean();
            if (!property) {
                throw new common_1.NotFoundException("Property not found or you are not authorized to delete it");
            }
            return {
                success: true,
                message: "Property deleted successfully",
                data: property,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException("Unable to delete property");
        }
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map