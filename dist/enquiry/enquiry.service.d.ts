import { EnquiryType, MovingInTime } from "../database/schema/enquiry.schema";
import { DatabaseService } from "../database/database.service";
import { Types } from 'mongoose';
import { ListingType } from "../database/schema/properties.schema";
export declare class EnquiryService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    raisePropertyEnquiry(name: string, email: string, number: string, enquiryType: EnquiryType, listingType?: ListingType, propertyId?: string, budget?: number, preferredArea?: string, movingInTime?: MovingInTime, message?: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../database/schema/enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("../database/schema/enquiry.schema").Enquiry & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    getAgentEnquiries(agentId: string, page?: number, limit?: number): Promise<{
        success: boolean;
        message: string;
        data: (import("../database/schema/enquiry.schema").Enquiry & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            totalEnquiries: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
}
