import { randomUUID } from "node:crypto";
import {
    Prop,
    Schema,
    SchemaFactory,
} from "@nestjs/mongoose";
import {
    HydratedDocument,
    Schema as MongooseSchema,
    Types,
} from "mongoose";
import { ListingType } from "./properties.schema";

export enum EnquiryType {
    PROPERTY = "PROPERTY",
    GENERAL = "GENERAL",
}

export enum EnquiryStatus {
    NEW = "NEW",
    CONTACTED = "CONTACTED",
    CLOSED = "CLOSED",
}

export enum MovingInTime {
    IMMEDIATELY = "IMMEDIATELY",
    WITHIN_1_MONTH = "WITHIN_1_MONTH",
    WITHIN_3_MONTHS = "WITHIN_3_MONTHS",
    WITHIN_6_MONTHS = "WITHIN_6_MONTHS",
    JUST_EXPLORING = "JUST_EXPLORING",
}

@Schema({
    timestamps: true,
    versionKey: false,
    collection: "enquiries",
})
export class Enquiry {
    @Prop({
        type: String,
        unique: true,
        index: true,
        immutable: true,
        default: () =>
            `ENQ-${randomUUID()
                .replaceAll("-", "")
                .slice(0, 10)
                .toUpperCase()}`,
    })
    enquiryId: string;

    @Prop({
        type: String,
        enum: Object.values(EnquiryType),
        default: EnquiryType.GENERAL,
        index: true,
    })
    enquiryType: EnquiryType;

    @Prop({
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must contain at least 2 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"],
    })
    name: string;

    @Prop({
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please provide a valid email",
        ],
    })
    email: string;

    @Prop({
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
    })
    phone: string;


    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: "Property",
        index: true,
        default: null,
    })
    propertyMongoId?: Types.ObjectId | null;

    @Prop({
        type: String,
        index: true,
        default: null,
    })
    propertyId?: string | null;


    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: "Agent",
        index: true,
        default: null,
    })
    agentId?: Types.ObjectId | null;



    @Prop({
        type: Number,
        min: [0, "Budget cannot be negative"],
        default: null,
    })
    budget?: number | null;


    @Prop({
        type: String,
        trim: true,
        maxlength: [200, "Preferred area cannot exceed 200 characters"],
        default: null,
    })
    preferredArea?: string | null;

    @Prop({
        type: String,
        enum: Object.values(MovingInTime),
        default: null,
    })
    movingInTime?: MovingInTime | null;

    @Prop({
        type: String,
        trim: true,
        maxlength: [1000, "Message cannot exceed 1000 characters"],
        default: "",
    })
    message?: string;

    @Prop({
        type: String,
        enum: Object.values(ListingType),
        required: [false, "Listing type is required"],
        index: true,
    })
    listingType: ListingType;

    @Prop({
        type: String,
        enum: Object.values(EnquiryStatus),
        default: EnquiryStatus.NEW,
        index: true,
    })
    status: EnquiryStatus;

    createdAt: Date;
    updatedAt: Date;
}

export type EnquiryDocument =
    HydratedDocument<Enquiry>;

export const EnquirySchema =
    SchemaFactory.createForClass(Enquiry);


EnquirySchema.index({
    agentId: 1,
    status: 1,
    createdAt: -1,
});

EnquirySchema.index({
    propertyMongoId: 1,
    createdAt: -1,
});