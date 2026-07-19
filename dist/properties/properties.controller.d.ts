import { PropertiesService } from './properties.service';
import { ListingType, NearestStation, PropertyAddress, PropertyAgeType, PropertyBenefit } from "../database/schema/properties.schema";
import { S3BucketService } from "../s3-bucket/s3-bucket.service";
export declare class PropertiesController {
    private readonly propertiesService;
    private readonly s3BucketService;
    constructor(propertiesService: PropertiesService, s3BucketService: S3BucketService);
    createProperty(req: any, body: {
        name: string;
        address: PropertyAddress;
        listingType: ListingType;
        carpetArea: number;
        configuration: string;
        description: string;
        estimatedPrice: number;
        propertyAgeType: PropertyAgeType;
        carpetAreaUnit?: "SQ_FT" | "SQ_METER";
        benefits: PropertyBenefit[];
        nearestStation: {
            name: string;
            distanceInKm: number;
        };
        images: string[];
        negotiable: boolean;
        propertyAgeInYears: number;
        googleMapLocation: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("src/database/schema/properties.schema").Property, {}, import("mongoose").DefaultSchemaOptions> & import("src/database/schema/properties.schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    editProperty(propertyId: string, req: any, body: {
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
    }): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("src/database/schema/properties.schema").Property, {}, import("mongoose").DefaultSchemaOptions> & import("src/database/schema/properties.schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    uploadPropertyImage(req: any, body: {
        base64: string;
        contentType?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            key: string;
            url: string;
        };
    }>;
    getAgentProperty(req: any): Promise<{
        success: boolean;
        message: string;
        data: (import("src/database/schema/properties.schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            totalProperties: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    getAllProperties(page: string, limit: string, status?: string, bhk?: string, minPrice?: string, maxPrice?: string, location?: string, listingType?: string): Promise<{
        success: boolean;
        message: string;
        data: (import("src/database/schema/properties.schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        filters: {
            status: string;
            bhk: number | null;
            minPrice: number | null;
            maxPrice: number | null;
            location: string | null;
            listingType: string | null;
        };
        pagination: {
            page: number;
            limit: number;
            totalProperties: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    getOneProperty(propertyId: string): Promise<{
        success: boolean;
        message: string;
        data: import("src/database/schema/properties.schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    deleteProperty(propertyId: string, req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
