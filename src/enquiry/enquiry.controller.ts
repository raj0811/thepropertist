import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    Post,
    Query,
    Req,
    UseGuards,
} from "@nestjs/common";

import { EnquiryType, MovingInTime } from "../database/schema/enquiry.schema";
import { EnquiryService } from "./enquiry.service";
import { ListingType } from "src/database/schema/properties.schema";
import { AgentAuthGuard } from "src/AuthGuard/agent.AuthGuard";



@Controller("enquiries")
export class EnquiryController {
    constructor(
        private readonly enquiriesService:
            EnquiryService,
    ) { }

    @Post("create")
    raiseEnquiry(
        @Body()
        body: {
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
        },
    ) {
        console.log(body.enquiryType, 'enquiryType');

        return this.enquiriesService
            .raisePropertyEnquiry(
                body.name,
                body.email,
                body.number,
                body.enquiryType,
                body.listingType,
                body.propertyId,
                body.budget,
                body.preferredArea,
                body.movingInTime,
                body.message,
            );
    }


    @Get("agent-enquiries")
    @UseGuards(AgentAuthGuard)
    getAgentEnquiries(
        @Req() req: any,
        @Query("page", new DefaultValuePipe("1"))
        page: string,
        @Query("limit", new DefaultValuePipe("10"))
        limit: string,
    ) {
        return this.enquiriesService.getAgentEnquiries(
            req.user.id,
            Number(page),
            Number(limit),
        );
    }
}