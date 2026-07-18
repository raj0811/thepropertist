import { BadRequestException, Body, Controller, DefaultValuePipe, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { AgentAuthGuard } from 'src/AuthGuard/agent.AuthGuard';
import { ListingType, NearestStation, PropertyAddress, PropertyAgeType, PropertyBenefit } from 'src/database/schema/properties.schema';
import { randomUUID } from "node:crypto";
import { S3BucketService } from 'src/s3-bucket/s3-bucket.service';
@Controller('properties')
export class PropertiesController {
    constructor(
        private readonly propertiesService: PropertiesService,
        private readonly s3BucketService: S3BucketService
    ) { }

    @Post('create')
    @UseGuards(AgentAuthGuard)
    createProperty(
        @Req() req: any,
        @Body() body: {
            name: string,
            address: PropertyAddress,
            listingType: ListingType,
            carpetArea: number,
            configuration: string,
            description: string,
            estimatedPrice: number,
            propertyAgeType: PropertyAgeType,
            carpetAreaUnit?: "SQ_FT" | "SQ_METER",
            benefits: PropertyBenefit[],
            nearestStation: {
                name: string,
                distanceInKm: number
            },
            images: string[],
            negotiable: boolean,
            propertyAgeInYears: number,
            googleMapLocation: string
        },
    ) {
        return this.propertiesService.createProperty(
            req.user.id,
            body.name,
            body.address,
            body.listingType,
            body.carpetArea,
            body.configuration,
            body.description,
            body.estimatedPrice,
            body.propertyAgeType,
            body.carpetAreaUnit,
            body.benefits,
            body.nearestStation,
            body.images,
            body.negotiable,
            body.propertyAgeInYears,
            body.googleMapLocation,
        );
    }

    @Patch("edit/:propertyId")
    @UseGuards(AgentAuthGuard)
    editProperty(
        @Param("propertyId") propertyId: string,
        @Req() req: any,
        @Body()
        body: {
            name?: string;
            address?: PropertyAddress;
            listingType?: ListingType;
            carpetArea?: number;
            configuration?: string;
            description?: string;
            estimatedPrice?: number;
            propertyAgeType?: PropertyAgeType;
            carpetAreaUnit?: "SQ_FT" | "SQ_METER";
            benefits?: PropertyBenefit[];
            nearestStation?: NearestStation;
            images?: string[];
            negotiable?: boolean;
            propertyAgeInYears?: number;
            googleMapLocation?: string;
        },
    ) {
        return this.propertiesService.editProperty(
            propertyId,
            req.user.id,
            body.name,
            body.address,
            body.listingType,
            body.carpetArea,
            body.configuration,
            body.description,
            body.estimatedPrice,
            body.propertyAgeType,
            body.carpetAreaUnit,
            body.benefits,
            body.nearestStation,
            body.images,
            body.negotiable,
            body.propertyAgeInYears,
            body.googleMapLocation,
        );
    }

    @Post("property-image")
    @UseGuards(AgentAuthGuard)
    async uploadPropertyImage(
        @Req() req: any,
        @Body()
        body: {
            base64: string;
            contentType?: string;
        },
    ) {
        if (!body.base64) {
            throw new BadRequestException(
                "Base64 image is required",
            );
        }

        /*
         * Supports both formats:
         *
         * data:image/jpeg;base64,/9j/4AAQ...
         *
         * or raw Base64:
         *
         * /9j/4AAQ...
         */
        const dataUrlMatch = body.base64.match(
            /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/,
        );

        let contentType: string;
        let base64Data: string;

        if (dataUrlMatch) {
            contentType = dataUrlMatch[1];
            base64Data = dataUrlMatch[2];
        } else {
            if (!body.contentType) {
                throw new BadRequestException(
                    "Content type is required for raw Base64 images",
                );
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
            throw new BadRequestException(
                "Only JPG, PNG and WebP images are allowed",
            );
        }

        let fileBuffer: Buffer;

        try {
            fileBuffer = Buffer.from(base64Data, "base64");
        } catch {
            throw new BadRequestException(
                "Invalid Base64 image",
            );
        }

        if (fileBuffer.length === 0) {
            throw new BadRequestException(
                "The provided image is empty",
            );
        }

        const maximumFileSize = 5 * 1024 * 1024;

        if (fileBuffer.length > maximumFileSize) {
            throw new BadRequestException(
                "Image size cannot exceed 5 MB",
            );
        }

        const extensionByContentType: Record<string, string> = {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/webp": "webp",
        };

        const extension =
            extensionByContentType[contentType];

        const key =
            `properties/${req.user.id}/` +
            `${randomUUID()}.${extension}`;

        const bucketName = process.env.AWS_S3_BUCKET_NAME;

        if (!bucketName) {
            throw new BadRequestException(
                "AWS_S3_BUCKET_NAME is not configured",
            );
        }

        const url =
            await this.s3BucketService.uploadToS3(
                fileBuffer,
                key,
                contentType,
                bucketName,
            );

        return {
            success: true,
            message: "Image uploaded successfully",
            data: {
                key,
                url,
            },
        };
    }

    @Get('agent-properties')
    @UseGuards(AgentAuthGuard)
    getAgentProperty(@Req() req: any) {
        return this.propertiesService.getAgentProperties(req.user.id)
    }

    @Get('all-properties')
    getAllProperties(
        @Query("page", new DefaultValuePipe("1"))
        page: string,

        @Query("limit", new DefaultValuePipe("10"))
        limit: string,

        @Query("status")
        status?: string,

        @Query("bhk")
        bhk?: string,

        @Query("minPrice")
        minPrice?: string,

        @Query("maxPrice")
        maxPrice?: string,

        @Query("location")
        location?: string,

        @Query("listingType")
        listingType?: string,
    ) {
        return this.propertiesService.getAllProperties(
            Number(page),
            Number(limit),
            status,
            bhk !== undefined ? Number(bhk) : undefined,
            minPrice !== undefined
                ? Number(minPrice)
                : undefined,
            maxPrice !== undefined
                ? Number(maxPrice)
                : undefined,
            location,
            listingType,
        );
    }

    @Get('/get/:propertyId')
    getOneProperty(
        @Param("propertyId") propertyId: string,
    ) {
        return this.propertiesService.getOnePropperty(propertyId);
    }

}
