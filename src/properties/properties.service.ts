import { BadRequestException, ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { DatabaseService } from 'src/database/database.service';
import { ListingType, NearestStation, PropertyAddress, PropertyAgeType, PropertyBenefit, PropertyStatus } from 'src/database/schema/properties.schema';

@Injectable()
export class PropertiesService {
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }


    async createProperty(
        agentMongoId: string,
        name: string,
        address: PropertyAddress,
        listingType: ListingType,
        carpetArea: number,
        configuration: string,
        description: string,
        estimatedPrice: number,
        propertyAgeType: PropertyAgeType,
        carpetAreaUnit?: "SQ_FT" | "SQ_METER",
        benefits?: PropertyBenefit[],
        nearestStation?: NearestStation,
        images?: string[],
        negotiable?: boolean,
        propertyAgeInYears?: number,
        googleMapLocation?: string,
    ) {
        try {
            if (!Types.ObjectId.isValid(agentMongoId)) {
                throw new BadRequestException("Invalid agent ID");
            }

            if (
                propertyAgeType === PropertyAgeType.EXISTING &&
                propertyAgeInYears === undefined
            ) {
                throw new BadRequestException(
                    "Property age in years is required for an existing property",
                );
            }

            const agentObjectId =
                new Types.ObjectId(agentMongoId);

            const agentExists =
                await this.databaseService.agentModel.exists({
                    _id: agentObjectId,
                });

            if (!agentExists) {
                throw new NotFoundException("Agent not found");
            }

            const normalizedAddress = {
                address: address.address.trim(),
                city: address.city.trim(),
                state: address.state.trim(),
                pincode: address.pincode.trim(),
            };

            const property =
                await this.databaseService.propertyModel.create({
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
        } catch (error: unknown) {
            console.log(error);

            if (error instanceof HttpException) {
                throw error;
            }

            if (
                typeof error === "object" &&
                error !== null &&
                "code" in error &&
                error.code === 11000
            ) {
                throw new ConflictException(
                    "Property already exists",
                );
            }

            if (
                error instanceof Error &&
                error.name === "ValidationError"
            ) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException(
                "Unable to create property",
            );
        }
    }


    async editProperty(
        propertyId: string,
        agentMongoId: string,
        name?: string,
        address?: PropertyAddress,
        listingType?: ListingType,
        carpetArea?: number,
        configuration?: string,
        description?: string,
        estimatedPrice?: number,
        propertyAgeType?: PropertyAgeType,
        carpetAreaUnit?: "SQ_FT" | "SQ_METER",
        benefits?: PropertyBenefit[],
        nearestStation?: NearestStation,
        images?: string[],
        negotiable?: boolean,
        propertyAgeInYears?: number,
        googleMapLocation?: string,
    ) {
        try {
            if (!Types.ObjectId.isValid(agentMongoId)) {
                throw new BadRequestException("Invalid agent ID");
            }
            console.log({
                propertyId, agentMongoId
            });

            const property =
                await this.databaseService.propertyModel.findOne({
                    _id: new Types.ObjectId(propertyId),
                    agentId: new Types.ObjectId(agentMongoId),
                });

            if (!property) {
                throw new NotFoundException(
                    "Property not found or you are not authorized to edit it",
                );
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


                if (
                    propertyAgeType !== PropertyAgeType.EXISTING
                ) {
                    property.propertyAgeInYears = undefined;
                }
            }

            if (propertyAgeInYears !== undefined) {
                property.propertyAgeInYears =
                    propertyAgeInYears;
            }


            if (
                property.propertyAgeType ===
                PropertyAgeType.EXISTING &&
                property.propertyAgeInYears === undefined
            ) {
                throw new BadRequestException(
                    "Property age in years is required for an existing property",
                );
            }

            await property.save();

            return {
                success: true,
                message: "Property updated successfully",
                data: property,
            };
        } catch (error: unknown) {
            if (error instanceof HttpException) {
                throw error;
            }

            if (
                error instanceof Error &&
                error.name === "ValidationError"
            ) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException(
                "Unable to update property",
            );
        }
    }




    async getAgentProperties(
        agentId: string,
        page: number = 1,
        limit: number = 10,
    ) {
        try {
            if (!Types.ObjectId.isValid(agentId)) {
                throw new BadRequestException("Invalid agent ID");
            }

            const currentPage = Math.max(Number(page) || 1, 1);
            const pageSize = Math.min(
                Math.max(Number(limit) || 10, 1),
                100,
            );

            const skip = (currentPage - 1) * pageSize;

            const filter = {
                agentId: new Types.ObjectId(agentId),
            };

            const [properties, totalProperties] =
                await Promise.all([
                    this.databaseService.propertyModel
                        .find(filter)
                        .sort({ createdAt: -1 })
                        .skip(skip)
                        .limit(pageSize)
                        .lean(),

                    this.databaseService.propertyModel.countDocuments(
                        filter,
                    ),
                ]);

            const totalPages = Math.ceil(
                totalProperties / pageSize,
            );

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
        } catch (error: unknown) {
            if (error instanceof HttpException) {
                throw error;
            }

            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException(
                "Unable to fetch agent properties",
            );
        }
    }

    async getAllProperties(
        page: number = 1,
        limit: number = 10,
        status?: string,
        bhk?: number,
        minPrice?: number,
        maxPrice?: number,
        location?: string,
        listingType?: string,
    ) {
        try {
            const currentPage = Math.max(Number(page) || 1, 1);

            const pageSize = Math.min(
                Math.max(Number(limit) || 10, 1),
                100,
            );

            if (
                minPrice !== undefined &&
                maxPrice !== undefined &&
                minPrice > maxPrice
            ) {
                throw new BadRequestException(
                    "Minimum price cannot be greater than maximum price",
                );
            }

            const filter: Record<string, any> = {};

            /*
             * Status filter
             */
            if (status) {
                const normalizedStatus = status.toUpperCase();

                if (
                    !Object.values(PropertyStatus).includes(
                        normalizedStatus as PropertyStatus,
                    )
                ) {
                    throw new BadRequestException(
                        "Invalid property status",
                    );
                }

                filter.status = normalizedStatus;
            } else {
                // Public listing defaults to available properties
                filter.status = PropertyStatus.AVAILABLE;
            }

            /*
             * BHK filter
             *
             * bhk=2 becomes configuration="2BHK"
             */
            if (bhk !== undefined) {
                const bhkNumber = Number(bhk);

                if (
                    !Number.isInteger(bhkNumber) ||
                    bhkNumber < 1 ||
                    bhkNumber > 20
                ) {
                    throw new BadRequestException(
                        "BHK must be between 1 and 20",
                    );
                }

                filter.configuration = `${bhkNumber}BHK`;
            }

            /*
             * Price range filter
             */
            if (
                minPrice !== undefined ||
                maxPrice !== undefined
            ) {
                filter.estimatedPrice = {};

                if (minPrice !== undefined) {
                    if (Number(minPrice) < 0) {
                        throw new BadRequestException(
                            "Minimum price cannot be negative",
                        );
                    }

                    filter.estimatedPrice.$gte = Number(minPrice);
                }

                if (maxPrice !== undefined) {
                    if (Number(maxPrice) < 0) {
                        throw new BadRequestException(
                            "Maximum price cannot be negative",
                        );
                    }

                    filter.estimatedPrice.$lte = Number(maxPrice);
                }
            }

            /*
             * Rent, sell or lease filter
             */
            if (listingType) {
                const normalizedListingType =
                    listingType.toUpperCase();

                if (
                    !Object.values(ListingType).includes(
                        normalizedListingType as ListingType,
                    )
                ) {
                    throw new BadRequestException(
                        "Listing type must be RENT, SELL or LEASE",
                    );
                }

                filter.listingType = normalizedListingType;
            }

            /*
             * Search by city, address, state or pincode
             */
            if (location?.trim()) {
                const escapedLocation = location
                    .trim()
                    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

                const locationRegex = new RegExp(
                    escapedLocation,
                    "i",
                );

                filter.$or = [
                    { city: locationRegex },
                    { "address.city": locationRegex },
                    { "address.address": locationRegex },
                    { "address.state": locationRegex },
                    { "address.pincode": locationRegex },
                ];
            }

            const skip = (currentPage - 1) * pageSize;

            const [properties, totalProperties] =
                await Promise.all([
                    this.databaseService.propertyModel
                        .find(filter)
                        .populate(
                            "agentId",
                            "agentId name email phone photo",
                        )
                        .sort({ createdAt: -1 })
                        .skip(skip)
                        .limit(pageSize)
                        .lean(),

                    this.databaseService.propertyModel.countDocuments(
                        filter,
                    ),
                ]);

            const totalPages = Math.ceil(
                totalProperties / pageSize,
            );

            return {
                success: true,
                message: "Properties fetched successfully",
                data: properties,
                filters: {
                    status: status ?? PropertyStatus.AVAILABLE,
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
        } catch (error: unknown) {
            if (error instanceof HttpException) {
                throw error;
            }

            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException(
                "Unable to fetch properties",
            );
        }
    }

    async getOnePropperty(
        propertyId: string,
    ) {
        try {
            if (!Types.ObjectId.isValid(propertyId)) {
                throw new BadRequestException("Invalid property ID");
            }

            const property = await this.databaseService.propertyModel
                .findById(propertyId)
                .populate(
                    "agentId",
                    "agentId name email phone photo",
                )
                .lean();

            if (!property) {
                throw new BadRequestException("Property not found");
            }

            return {
                success: true,
                message: "Property fetched successfully",
                data: property,
            };
        } catch (error: unknown) {
            if (error instanceof HttpException) {
                throw error;
            }

            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException(
                "Unable to fetch property",
            );
        }
    }

    async deleteProperty(
        propertyId: string,
        agentId: string,
    ) {
        try {
            if (!Types.ObjectId.isValid(propertyId)) {
                throw new BadRequestException(
                    "Invalid property ID",
                );
            }

            if (!Types.ObjectId.isValid(agentId)) {
                throw new BadRequestException(
                    "Invalid agent ID",
                );
            }

            const property =
                await this.databaseService.propertyModel
                    .findOneAndDelete({
                        _id: new Types.ObjectId(propertyId),
                        agentId: new Types.ObjectId(agentId),
                    })
                    .lean();

            if (!property) {
                throw new NotFoundException(
                    "Property not found or you are not authorized to delete it",
                );
            }

            return {
                success: true,
                message: "Property deleted successfully",
                data: property,
            };
        } catch (error: unknown) {
            if (error instanceof HttpException) {
                throw error;
            }

            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException(
                "Unable to delete property",
            );
        }
    }

}
