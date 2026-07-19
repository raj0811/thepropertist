import { Types } from 'mongoose';
import { DatabaseService } from "../database/database.service";
import { ListingType, NearestStation, PropertyAddress, PropertyAgeType, PropertyBenefit } from "../database/schema/properties.schema";
export declare class PropertiesService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    createProperty(agentMongoId: string, name: string, address: PropertyAddress, listingType: ListingType, carpetArea: number, configuration: string, description: string, estimatedPrice: number, propertyAgeType: PropertyAgeType, carpetAreaUnit?: "SQ_FT" | "SQ_METER", benefits?: PropertyBenefit[], nearestStation?: NearestStation, images?: string[], negotiable?: boolean, propertyAgeInYears?: number, googleMapLocation?: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("src/database/schema/properties.schema").Property, {}, import("mongoose").DefaultSchemaOptions> & import("src/database/schema/properties.schema").Property & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    editProperty(propertyId: string, agentMongoId: string, name?: string, address?: PropertyAddress, listingType?: ListingType, carpetArea?: number, configuration?: string, description?: string, estimatedPrice?: number, propertyAgeType?: PropertyAgeType, carpetAreaUnit?: "SQ_FT" | "SQ_METER", benefits?: PropertyBenefit[], nearestStation?: NearestStation, images?: string[], negotiable?: boolean, propertyAgeInYears?: number, googleMapLocation?: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("src/database/schema/properties.schema").Property, {}, import("mongoose").DefaultSchemaOptions> & import("src/database/schema/properties.schema").Property & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    getAgentProperties(agentId: string, page?: number, limit?: number): Promise<{
        success: boolean;
        message: string;
        data: (import("src/database/schema/properties.schema").Property & {
            _id: Types.ObjectId;
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
    getAllProperties(page?: number, limit?: number, status?: string, bhk?: number, minPrice?: number, maxPrice?: number, location?: string, listingType?: string): Promise<{
        success: boolean;
        message: string;
        data: (import("src/database/schema/properties.schema").Property & {
            _id: Types.ObjectId;
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
    getOnePropperty(propertyId: string): Promise<{
        success: boolean;
        message: string;
        data: import("src/database/schema/properties.schema").Property & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    deleteProperty(propertyId: string, agentId: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
