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
exports.EnquirySchema = exports.Enquiry = exports.MovingInTime = exports.EnquiryStatus = exports.EnquiryType = void 0;
const node_crypto_1 = require("node:crypto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const properties_schema_1 = require("./properties.schema");
var EnquiryType;
(function (EnquiryType) {
    EnquiryType["PROPERTY"] = "PROPERTY";
    EnquiryType["GENERAL"] = "GENERAL";
})(EnquiryType || (exports.EnquiryType = EnquiryType = {}));
var EnquiryStatus;
(function (EnquiryStatus) {
    EnquiryStatus["NEW"] = "NEW";
    EnquiryStatus["CONTACTED"] = "CONTACTED";
    EnquiryStatus["CLOSED"] = "CLOSED";
})(EnquiryStatus || (exports.EnquiryStatus = EnquiryStatus = {}));
var MovingInTime;
(function (MovingInTime) {
    MovingInTime["IMMEDIATELY"] = "IMMEDIATELY";
    MovingInTime["WITHIN_1_MONTH"] = "WITHIN_1_MONTH";
    MovingInTime["WITHIN_3_MONTHS"] = "WITHIN_3_MONTHS";
    MovingInTime["WITHIN_6_MONTHS"] = "WITHIN_6_MONTHS";
    MovingInTime["JUST_EXPLORING"] = "JUST_EXPLORING";
})(MovingInTime || (exports.MovingInTime = MovingInTime = {}));
let Enquiry = class Enquiry {
    enquiryId;
    enquiryType;
    name;
    email;
    phone;
    propertyMongoId;
    propertyId;
    agentId;
    budget;
    preferredArea;
    movingInTime;
    message;
    listingType;
    status;
    createdAt;
    updatedAt;
};
exports.Enquiry = Enquiry;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        index: true,
        immutable: true,
        default: () => `ENQ-${(0, node_crypto_1.randomUUID)()
            .replaceAll("-", "")
            .slice(0, 10)
            .toUpperCase()}`,
    }),
    __metadata("design:type", String)
], Enquiry.prototype, "enquiryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(EnquiryType),
        default: EnquiryType.GENERAL,
        index: true,
    }),
    __metadata("design:type", String)
], Enquiry.prototype, "enquiryType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must contain at least 2 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"],
    }),
    __metadata("design:type", String)
], Enquiry.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please provide a valid email",
        ],
    }),
    __metadata("design:type", String)
], Enquiry.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
    }),
    __metadata("design:type", String)
], Enquiry.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "Property",
        index: true,
        default: null,
    }),
    __metadata("design:type", Object)
], Enquiry.prototype, "propertyMongoId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        index: true,
        default: null,
    }),
    __metadata("design:type", Object)
], Enquiry.prototype, "propertyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "Agent",
        index: true,
        default: null,
    }),
    __metadata("design:type", Object)
], Enquiry.prototype, "agentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        min: [0, "Budget cannot be negative"],
        default: null,
    }),
    __metadata("design:type", Object)
], Enquiry.prototype, "budget", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        maxlength: [200, "Preferred area cannot exceed 200 characters"],
        default: null,
    }),
    __metadata("design:type", Object)
], Enquiry.prototype, "preferredArea", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(MovingInTime),
        default: null,
    }),
    __metadata("design:type", Object)
], Enquiry.prototype, "movingInTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        maxlength: [1000, "Message cannot exceed 1000 characters"],
        default: "",
    }),
    __metadata("design:type", String)
], Enquiry.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(properties_schema_1.ListingType),
        required: [false, "Listing type is required"],
        index: true,
    }),
    __metadata("design:type", String)
], Enquiry.prototype, "listingType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(EnquiryStatus),
        default: EnquiryStatus.NEW,
        index: true,
    }),
    __metadata("design:type", String)
], Enquiry.prototype, "status", void 0);
exports.Enquiry = Enquiry = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        versionKey: false,
        collection: "enquiries",
    })
], Enquiry);
exports.EnquirySchema = mongoose_1.SchemaFactory.createForClass(Enquiry);
exports.EnquirySchema.index({
    agentId: 1,
    status: 1,
    createdAt: -1,
});
exports.EnquirySchema.index({
    propertyMongoId: 1,
    createdAt: -1,
});
//# sourceMappingURL=enquiry.schema.js.map