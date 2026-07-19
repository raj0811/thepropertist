import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";
export declare enum ListingType {
    RENT = "RENT",
    SELL = "SELL",
    LEASE = "LEASE",
    NOT_SURE = "NOT_SURE"
}
export declare enum PropertyBenefit {
    GATED_SOCIETY = "GATED_SOCIETY",
    GYM = "GYM",
    POOL = "POOL",
    PARK = "PARK"
}
export declare enum PropertyAgeType {
    NEW = "NEW",
    UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
    EXISTING = "EXISTING"
}
export declare enum PropertyStatus {
    AVAILABLE = "AVAILABLE",
    RENTED = "RENTED",
    SOLD = "SOLD",
    INACTIVE = "INACTIVE"
}
export declare class PropertyAddress {
    address: string;
    city: string;
    state: string;
    pincode: string;
}
export declare const PropertyAddressSchema: MongooseSchema<PropertyAddress, import("mongoose").Model<PropertyAddress, any, any, any, any, any, PropertyAddress>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PropertyAddress, import("mongoose").Document<unknown, {}, PropertyAddress, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<PropertyAddress & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    address?: import("mongoose").SchemaDefinitionProperty<string, PropertyAddress, import("mongoose").Document<unknown, {}, PropertyAddress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PropertyAddress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    city?: import("mongoose").SchemaDefinitionProperty<string, PropertyAddress, import("mongoose").Document<unknown, {}, PropertyAddress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PropertyAddress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    state?: import("mongoose").SchemaDefinitionProperty<string, PropertyAddress, import("mongoose").Document<unknown, {}, PropertyAddress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PropertyAddress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    pincode?: import("mongoose").SchemaDefinitionProperty<string, PropertyAddress, import("mongoose").Document<unknown, {}, PropertyAddress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PropertyAddress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, PropertyAddress>;
export declare class NearestStation {
    name: string;
    distanceInKm: number;
}
export declare const NearestStationSchema: MongooseSchema<NearestStation, import("mongoose").Model<NearestStation, any, any, any, any, any, NearestStation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NearestStation, import("mongoose").Document<unknown, {}, NearestStation, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<NearestStation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, NearestStation, import("mongoose").Document<unknown, {}, NearestStation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<NearestStation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    distanceInKm?: import("mongoose").SchemaDefinitionProperty<number, NearestStation, import("mongoose").Document<unknown, {}, NearestStation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<NearestStation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, NearestStation>;
export declare class Property {
    name: string;
    city: string;
    address: PropertyAddress;
    agentId: Types.ObjectId;
    listingType: ListingType;
    carpetArea: number;
    carpetAreaUnit: "SQ_FT" | "SQ_METER";
    configuration: string;
    benefits: PropertyBenefit[];
    nearestStation?: NearestStation;
    description: string;
    images: string[];
    estimatedPrice: number;
    currency: "INR";
    negotiable: boolean;
    propertyAgeType: PropertyAgeType;
    propertyAgeInYears?: number;
    googleMapLocation: string;
    status: PropertyStatus;
    createdAt: Date;
    updatedAt: Date;
}
export type PropertyDocument = HydratedDocument<Property>;
export declare const PropertySchema: MongooseSchema<Property, import("mongoose").Model<Property, any, any, any, any, any, Property>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Property, import("mongoose").Document<unknown, {}, Property, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    city?: import("mongoose").SchemaDefinitionProperty<string, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<PropertyAddress, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    agentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    listingType?: import("mongoose").SchemaDefinitionProperty<ListingType, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    carpetArea?: import("mongoose").SchemaDefinitionProperty<number, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    carpetAreaUnit?: import("mongoose").SchemaDefinitionProperty<"SQ_FT" | "SQ_METER", Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    configuration?: import("mongoose").SchemaDefinitionProperty<string, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    benefits?: import("mongoose").SchemaDefinitionProperty<PropertyBenefit[], Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    nearestStation?: import("mongoose").SchemaDefinitionProperty<NearestStation | undefined, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    images?: import("mongoose").SchemaDefinitionProperty<string[], Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    estimatedPrice?: import("mongoose").SchemaDefinitionProperty<number, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    currency?: import("mongoose").SchemaDefinitionProperty<"INR", Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    negotiable?: import("mongoose").SchemaDefinitionProperty<boolean, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    propertyAgeType?: import("mongoose").SchemaDefinitionProperty<PropertyAgeType, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    propertyAgeInYears?: import("mongoose").SchemaDefinitionProperty<number | undefined, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    googleMapLocation?: import("mongoose").SchemaDefinitionProperty<string, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<PropertyStatus, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Property>;
