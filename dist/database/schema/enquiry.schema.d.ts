import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";
import { ListingType } from "./properties.schema";
export declare enum EnquiryType {
    PROPERTY = "PROPERTY",
    GENERAL = "GENERAL"
}
export declare enum EnquiryStatus {
    NEW = "NEW",
    CONTACTED = "CONTACTED",
    CLOSED = "CLOSED"
}
export declare enum MovingInTime {
    IMMEDIATELY = "IMMEDIATELY",
    WITHIN_1_MONTH = "WITHIN_1_MONTH",
    WITHIN_3_MONTHS = "WITHIN_3_MONTHS",
    WITHIN_6_MONTHS = "WITHIN_6_MONTHS",
    JUST_EXPLORING = "JUST_EXPLORING"
}
export declare class Enquiry {
    enquiryId: string;
    enquiryType: EnquiryType;
    name: string;
    email: string;
    phone: string;
    propertyMongoId?: Types.ObjectId | null;
    propertyId?: string | null;
    agentId?: Types.ObjectId | null;
    budget?: number | null;
    preferredArea?: string | null;
    movingInTime?: MovingInTime | null;
    message?: string;
    listingType: ListingType;
    status: EnquiryStatus;
    createdAt: Date;
    updatedAt: Date;
}
export type EnquiryDocument = HydratedDocument<Enquiry>;
export declare const EnquirySchema: MongooseSchema<Enquiry, import("mongoose").Model<Enquiry, any, any, any, any, any, Enquiry>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    enquiryId?: import("mongoose").SchemaDefinitionProperty<string, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    enquiryType?: import("mongoose").SchemaDefinitionProperty<EnquiryType, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    propertyMongoId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | null | undefined, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    propertyId?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    agentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | null | undefined, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    budget?: import("mongoose").SchemaDefinitionProperty<number | null | undefined, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    preferredArea?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    movingInTime?: import("mongoose").SchemaDefinitionProperty<MovingInTime | null | undefined, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    message?: import("mongoose").SchemaDefinitionProperty<string | undefined, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    listingType?: import("mongoose").SchemaDefinitionProperty<ListingType, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<EnquiryStatus, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Enquiry, import("mongoose").Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Enquiry>;
