import {
    BadRequestException,
    HttpException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";

import { EnquiryType, MovingInTime } from "../database/schema/enquiry.schema";
import { DatabaseService } from "../database/database.service";
import { Types } from 'mongoose'
import { ListingType } from "src/database/schema/properties.schema";
@Injectable()
export class EnquiryService {
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }

    async raisePropertyEnquiry(
        name: string,
        email: string,
        number: string,
        enquiryType: EnquiryType,
        listingType?: ListingType,
        propertyId?: string,
        budget?: number,
        preferredArea?: string,
        movingInTime?: MovingInTime,
        message?: string,
    ) {
        try {
            if (
                !Object.values(EnquiryType).includes(
                    enquiryType,
                )
            ) {
                console.log(enquiryType, 'eee');

                throw new BadRequestException(
                    "Invalid enquiry type",
                );
            }

            const normalizedEmail = email
                .trim()
                .toLowerCase();

            const normalizedPhone = number.trim();

            if (
                enquiryType === EnquiryType.PROPERTY
            ) {
                if (!propertyId?.trim()) {
                    throw new BadRequestException(
                        "Property ID is required for a property enquiry",
                    );
                }
                console.log(propertyId, 'propertyId');

                const property =
                    await this.databaseService.propertyModel
                        .findOne({
                            _id:
                                new Types.ObjectId(propertyId),
                        })
                        .select(
                            "_id propertyId agentId status",
                        )
                        .lean();

                if (!property) {
                    throw new NotFoundException(
                        "Property not found",
                    );
                }

                const enquiry =
                    await this.databaseService.enquiryModel.create({
                        name: name.trim(),
                        email: normalizedEmail,
                        phone: normalizedPhone,
                        enquiryType:
                            EnquiryType.PROPERTY,
                        propertyMongoId:
                            property._id,
                        agentId: property.agentId,
                        budget,
                        preferredArea:
                            preferredArea?.trim(),
                        movingInTime,
                        message: message?.trim(),
                    });

                return {
                    success: true,
                    message:
                        "Property enquiry submitted successfully",
                    data: enquiry,
                };
            }

            const enquiry =
                await this.databaseService.enquiryModel.create({
                    name: name.trim(),
                    email: normalizedEmail,
                    phone: normalizedPhone,
                    enquiryType: EnquiryType.GENERAL,
                    listingType,
                    propertyMongoId: null,
                    agentId: null,
                    budget,
                    preferredArea:
                        preferredArea?.trim(),
                    movingInTime,
                    message: message?.trim(),
                });

            return {
                success: true,
                message:
                    "General enquiry submitted successfully",
                data: enquiry,
            };
        } catch (error: unknown) {
            if (error instanceof HttpException) {
                throw error;
            }

            if (
                error instanceof Error &&
                error.name === "ValidationError"
            ) {
                throw new BadRequestException(
                    error.message,
                );
            }

            if (error instanceof Error) {
                throw new BadRequestException(
                    error.message,
                );
            }

            throw new BadRequestException(
                "Unable to submit enquiry",
            );
        }
    }

    async getAgentEnquiries(
        agentId: string,
        page = 1,
        limit = 10,
    ) {
        try {
            if (!Types.ObjectId.isValid(agentId)) {
                throw new BadRequestException(
                    "Invalid agent ID",
                );
            }

            const currentPage = Math.max(Number(page) || 1, 1);
            const pageLimit = Math.min(
                Math.max(Number(limit) || 10, 1),
                50,
            );

            const skip = (currentPage - 1) * pageLimit;

            const filter = {
                agentId: new Types.ObjectId(agentId),
            };

            const [enquiries, totalEnquiries] =
                await Promise.all([
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

            const totalPages = Math.ceil(
                totalEnquiries / pageLimit,
            );

            return {
                success: true,
                message:
                    "Agent enquiries fetched successfully",
                data: enquiries,
                pagination: {
                    page: currentPage,
                    limit: pageLimit,
                    totalEnquiries,
                    totalPages,
                    hasNextPage:
                        currentPage < totalPages,
                    hasPreviousPage:
                        currentPage > 1,
                },
            };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new BadRequestException(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch enquiries",
            );
        }
    }
}