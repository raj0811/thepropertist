"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertySchema = exports.Property = exports.NearestStationSchema = exports.NearestStation = exports.PropertyAddressSchema = exports.PropertyAddress = exports.PropertyStatus = exports.PropertyAgeType = exports.PropertyBenefit = exports.ListingType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var ListingType;
(function (ListingType) {
    ListingType["RENT"] = "RENT";
    ListingType["SELL"] = "SELL";
    ListingType["LEASE"] = "LEASE";
    ListingType["NOT_SURE"] = "NOT_SURE";
})(ListingType || (exports.ListingType = ListingType = {}));
var PropertyBenefit;
(function (PropertyBenefit) {
    PropertyBenefit["GATED_SOCIETY"] = "GATED_SOCIETY";
    PropertyBenefit["GYM"] = "GYM";
    PropertyBenefit["POOL"] = "POOL";
    PropertyBenefit["PARK"] = "PARK";
})(PropertyBenefit || (exports.PropertyBenefit = PropertyBenefit = {}));
var PropertyAgeType;
(function (PropertyAgeType) {
    PropertyAgeType["NEW"] = "NEW";
    PropertyAgeType["UNDER_CONSTRUCTION"] = "UNDER_CONSTRUCTION";
    PropertyAgeType["EXISTING"] = "EXISTING";
})(PropertyAgeType || (exports.PropertyAgeType = PropertyAgeType = {}));
var PropertyStatus;
(function (PropertyStatus) {
    PropertyStatus["AVAILABLE"] = "AVAILABLE";
    PropertyStatus["RENTED"] = "RENTED";
    PropertyStatus["SOLD"] = "SOLD";
    PropertyStatus["INACTIVE"] = "INACTIVE";
})(PropertyStatus || (exports.PropertyStatus = PropertyStatus = {}));
let PropertyAddress = class PropertyAddress {
    address;
    city;
    state;
    pincode;
};
exports.PropertyAddress = PropertyAddress;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Address is required"],
        trim: true,
        maxlength: [500, "Address cannot exceed 500 characters"],
    }),
    __metadata("design:type", String)
], PropertyAddress.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "City is required"],
        trim: true,
        index: true,
    }),
    __metadata("design:type", String)
], PropertyAddress.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "State is required"],
        trim: true,
    }),
    __metadata("design:type", String)
], PropertyAddress.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Pincode is required"],
        trim: true,
        match: [/^[1-9][0-9]{5}$/, "Please provide a valid pincode"],
    }),
    __metadata("design:type", String)
], PropertyAddress.prototype, "pincode", void 0);
exports.PropertyAddress = PropertyAddress = __decorate([
    (0, mongoose_1.Schema)({
        _id: false,
        versionKey: false,
    })
], PropertyAddress);
exports.PropertyAddressSchema = mongoose_1.SchemaFactory.createForClass(PropertyAddress);
let NearestStation = class NearestStation {
    name;
    distanceInKm;
};
exports.NearestStation = NearestStation;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [false, "Station name is required"],
        trim: true,
    }),
    __metadata("design:type", String)
], NearestStation.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: [false, "Station distance is required"],
        min: [0, "Station distance cannot be negative"],
    }),
    __metadata("design:type", Number)
], NearestStation.prototype, "distanceInKm", void 0);
exports.NearestStation = NearestStation = __decorate([
    (0, mongoose_1.Schema)({
        _id: false,
        versionKey: false,
    })
], NearestStation);
exports.NearestStationSchema = mongoose_1.SchemaFactory.createForClass(NearestStation);
let Property = class Property {
    name;
    city;
    address;
    agentId;
    listingType;
    carpetArea;
    carpetAreaUnit;
    configuration;
    benefits;
    nearestStation;
    description;
    images;
    estimatedPrice;
    currency;
    negotiable;
    propertyAgeType;
    propertyAgeInYears;
    googleMapLocation;
    status;
    createdAt;
    updatedAt;
};
exports.Property = Property;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Property name is required"],
        trim: true,
        minlength: [3, "Property name must contain at least 3 characters"],
        maxlength: [150, "Property name cannot exceed 150 characters"],
    }),
    __metadata("design:type", String)
], Property.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "City is required"],
        trim: true,
        index: true,
    }),
    __metadata("design:type", String)
], Property.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: exports.PropertyAddressSchema,
        required: [true, "Property address is required"],
    }),
    __metadata("design:type", PropertyAddress)
], Property.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: "Agent",
        required: [true, "Agent ID is required"],
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Property.prototype, "agentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(ListingType),
        required: [true, "Listing type is required"],
        index: true,
    }),
    __metadata("design:type", String)
], Property.prototype, "listingType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: [true, "Carpet area is required"],
        min: [1, "Carpet area must be greater than zero"],
    }),
    __metadata("design:type", Number)
], Property.prototype, "carpetArea", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: "SQ_FT",
        enum: ["SQ_FT", "SQ_METER"],
    }),
    __metadata("design:type", String)
], Property.prototype, "carpetAreaUnit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: [true, "Property configuration is required"], uppercase: true, trim: true, index: true, validate: { validator: (value) => /^(1RK|[1-9][0-9]*BHK|DUPLEX)$/.test(value), message: "Configuration must be 1RK, 1BHK, 2BHK, 3BHK, DUPLEX, etc.", }, }),
    __metadata("design:type", String)
], Property.prototype, "configuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        enum: Object.values(PropertyBenefit),
        default: [],
    }),
    __metadata("design:type", Array)
], Property.prototype, "benefits", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: exports.NearestStationSchema,
        required: false,
    }),
    __metadata("design:type", NearestStation)
], Property.prototype, "nearestStation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [10, "Description must contain at least 10 characters"],
        maxlength: [3000, "Description cannot exceed 3000 characters"],
    }),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        default: [],
        validate: {
            validator: (images) => images.length <= 20,
            message: "A property can contain a maximum of 20 images",
        },
    }),
    __metadata("design:type", Array)
], Property.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: [true, "Estimated price is required"],
        min: [0, "Estimated price cannot be negative"],
        index: true,
    }),
    __metadata("design:type", Number)
], Property.prototype, "estimatedPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ["INR"],
        default: "INR",
    }),
    __metadata("design:type", String)
], Property.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Property.prototype, "negotiable", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(PropertyAgeType),
        required: [true, "Property age type is required"],
    }),
    __metadata("design:type", String)
], Property.prototype, "propertyAgeType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        min: [0, "Property age cannot be negative"],
        max: [200, "Please provide a valid property age"],
        required: function () {
            return this.propertyAgeType === PropertyAgeType.EXISTING;
        },
    }),
    __metadata("design:type", Number)
], Property.prototype, "propertyAgeInYears", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Property.prototype, "googleMapLocation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(PropertyStatus),
        default: PropertyStatus.AVAILABLE,
        index: true,
    }),
    __metadata("design:type", String)
], Property.prototype, "status", void 0);
exports.Property = Property = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        versionKey: false,
        collection: "properties",
    })
], Property);
exports.PropertySchema = mongoose_1.SchemaFactory.createForClass(Property);
exports.PropertySchema.index({
    city: 1,
    listingType: 1,
    configuration: 1,
    estimatedPrice: 1,
});
exports.PropertySchema.index({
    agentId: 1,
    createdAt: -1,
});
exports.PropertySchema.index({
    googleMapLocation: "2dsphere",
});
//# sourceMappingURL=properties.schema.js.map