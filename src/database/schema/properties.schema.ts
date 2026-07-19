import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";
import {
  HydratedDocument,
  Schema as MongooseSchema,
  ObjectId,
  Types,
} from "mongoose";
import { randomUUID } from "node:crypto";
export enum ListingType {
  RENT = "RENT",
  SELL = "SELL",
  LEASE = "LEASE",
  NOT_SURE = "NOT_SURE"
}

export enum PropertyBenefit {
  GATED_SOCIETY = "GATED_SOCIETY",
  GYM = "GYM",
  POOL = "POOL",
  PARK = "PARK",
}

export enum PropertyAgeType {
  NEW = "NEW",
  UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
  EXISTING = "EXISTING",
}

export enum PropertyStatus {
  AVAILABLE = "AVAILABLE",
  RENTED = "RENTED",
  SOLD = "SOLD",
  INACTIVE = "INACTIVE",
}


@Schema({
  _id: false,
  versionKey: false,
})
export class PropertyAddress {
  @Prop({
    type: String,
    required: [true, "Address is required"],
    trim: true,
    maxlength: [500, "Address cannot exceed 500 characters"],
  })
  address: string;

  @Prop({
    type: String,
    required: [true, "City is required"],
    trim: true,
    index: true,
  })
  city: string;

  @Prop({
    type: String,
    required: [true, "State is required"],
    trim: true,
  })
  state: string;

  @Prop({
    type: String,
    required: [true, "Pincode is required"],
    trim: true,
    match: [/^[1-9][0-9]{5}$/, "Please provide a valid pincode"],
  })
  pincode: string;
}

export const PropertyAddressSchema =
  SchemaFactory.createForClass(PropertyAddress);


@Schema({
  _id: false,
  versionKey: false,
})
export class NearestStation {
  @Prop({
    type: String,
    required: [false, "Station name is required"],
    trim: true,
  })
  name: string;

  @Prop({
    type: Number,
    required: [false, "Station distance is required"],
    min: [0, "Station distance cannot be negative"],
  })
  distanceInKm: number;
}

export const NearestStationSchema =
  SchemaFactory.createForClass(NearestStation);



//schemaa
@Schema({
  timestamps: true,
  versionKey: false,
  collection: "properties",
})
export class Property {
  @Prop({
    type: String,
    required: [true, "Property name is required"],
    trim: true,
    minlength: [3, "Property name must contain at least 3 characters"],
    maxlength: [150, "Property name cannot exceed 150 characters"],
  })
  name: string;


  @Prop({
    type: String,
    required: [true, "City is required"],
    trim: true,
    index: true,
  })
  city: string;

  @Prop({
    type: PropertyAddressSchema,
    required: [true, "Property address is required"],
  })
  address: PropertyAddress;

  @Prop({
    type: Types.ObjectId,
    ref: "Agent",
    required: [true, "Agent ID is required"],
    index: true,
  })
  agentId: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(ListingType),
    required: [true, "Listing type is required"],
    index: true,
  })
  listingType: ListingType;

  @Prop({
    type: Number,
    required: [true, "Carpet area is required"],
    min: [1, "Carpet area must be greater than zero"],
  })
  carpetArea: number;

  @Prop({
    type: String,
    default: "SQ_FT",
    enum: ["SQ_FT", "SQ_METER"],
  })
  carpetAreaUnit: "SQ_FT" | "SQ_METER";

  @Prop({ type: String, required: [true, "Property configuration is required"], uppercase: true, trim: true, index: true, validate: { validator: (value: string) => /^(1RK|[1-9][0-9]*BHK|DUPLEX)$/.test(value), message: "Configuration must be 1RK, 1BHK, 2BHK, 3BHK, DUPLEX, etc.", }, })
  configuration: string;

  @Prop({
    type: [String],
    enum: Object.values(PropertyBenefit),
    default: [],
  })
  benefits: PropertyBenefit[];

  @Prop({
    type: NearestStationSchema,
    required: false,
  })
  nearestStation?: NearestStation;

  @Prop({
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [10, "Description must contain at least 10 characters"],
    maxlength: [3000, "Description cannot exceed 3000 characters"],
  })
  description: string;

  @Prop({
    type: [String],
    default: [],
    validate: {
      validator: (images: string[]) => images.length <= 20,
      message: "A property can contain a maximum of 20 images",
    },
  })
  images: string[];


  @Prop({
    type: Number,
    required: [true, "Estimated price is required"],
    min: [0, "Estimated price cannot be negative"],
    index: true,
  })
  estimatedPrice: number;

  @Prop({
    type: String,
    enum: ["INR"],
    default: "INR",
  })
  currency: "INR";

  @Prop({
    type: Boolean,
    default: false,
  })
  negotiable: boolean;

  @Prop({
    type: String,
    enum: Object.values(PropertyAgeType),
    required: [true, "Property age type is required"],
  })
  propertyAgeType: PropertyAgeType;


  @Prop({
    type: Number,
    min: [0, "Property age cannot be negative"],
    max: [200, "Please provide a valid property age"],
    required: function (this: Property) {
      return this.propertyAgeType === PropertyAgeType.EXISTING;
    },
  })
  propertyAgeInYears?: number;

  @Prop({
    type: String,
  })
  googleMapLocation: string;

  @Prop({
    type: String,
    enum: Object.values(PropertyStatus),
    default: PropertyStatus.AVAILABLE,
    index: true,
  })
  status: PropertyStatus;

  createdAt: Date;
  updatedAt: Date;
}

export type PropertyDocument = HydratedDocument<Property>;

export const PropertySchema =
  SchemaFactory.createForClass(Property);


PropertySchema.index({
  city: 1,
  listingType: 1,
  configuration: 1,
  estimatedPrice: 1,
});


PropertySchema.index({
  agentId: 1,
  createdAt: -1,
});


PropertySchema.index({
  googleMapLocation: "2dsphere",
});