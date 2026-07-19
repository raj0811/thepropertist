import { EnquiryType, MovingInTime } from "../database/schema/enquiry.schema";
import { EnquiryService } from "./enquiry.service";
import { ListingType } from "../database/schema/properties.schema";
export declare class EnquiryController {
    private readonly enquiriesService;
    constructor(enquiriesService: EnquiryService);
    raiseEnquiry(body: {
        name: string;
        email: string;
        number: string;
        enquiryType: EnquiryType;
        listingType?: ListingType;
        propertyId?: string;
        budget?: number;
        preferredArea?: string;
        movingInTime?: MovingInTime;
        message?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../database/schema/enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("../database/schema/enquiry.schema").Enquiry & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    getAgentEnquiries(req: any, page: string, limit: string): Promise<{
        success: boolean;
        message: string;
        data: (import("../database/schema/enquiry.schema").Enquiry & {
            _id: import("mongoose").Types.ObjectId;
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
