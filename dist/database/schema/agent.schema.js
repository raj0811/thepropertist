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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentSchema = exports.Agent = exports.CertificationSchema = exports.Certification = exports.AgentStatus = void 0;
const node_crypto_1 = require("node:crypto");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("@nestjs/mongoose");
var AgentStatus;
(function (AgentStatus) {
    AgentStatus["PENDING"] = "PENDING";
    AgentStatus["VERIFIED"] = "VERIFIED";
    AgentStatus["REJECTED"] = "REJECTED";
    AgentStatus["BLOCKED"] = "BLOCKED";
})(AgentStatus || (exports.AgentStatus = AgentStatus = {}));
let Certification = class Certification {
    name;
    certificateNumber;
    documentUrl;
    issuedBy;
};
exports.Certification = Certification;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        trim: true,
    }),
    __metadata("design:type", String)
], Certification.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        trim: true,
    }),
    __metadata("design:type", String)
], Certification.prototype, "certificateNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        trim: true,
    }),
    __metadata("design:type", String)
], Certification.prototype, "documentUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        trim: true,
    }),
    __metadata("design:type", String)
], Certification.prototype, "issuedBy", void 0);
exports.Certification = Certification = __decorate([
    (0, mongoose_1.Schema)({
        _id: false,
        versionKey: false,
    })
], Certification);
exports.CertificationSchema = mongoose_1.SchemaFactory.createForClass(Certification);
let Agent = class Agent {
    agentId;
    name;
    phone;
    email;
    address;
    localities;
    experience;
    photo;
    password;
    certifications;
    expertise;
    bio;
    status;
    createdAt;
    updatedAt;
};
exports.Agent = Agent;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        index: true,
        immutable: true,
        default: () => `AGT-${(0, node_crypto_1.randomUUID)()
            .replaceAll("-", "")
            .slice(0, 10)
            .toUpperCase()}`,
    }),
    __metadata("design:type", String)
], Agent.prototype, "agentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Agent name is required"],
        trim: true,
        minlength: [2, "Name must contain at least 2 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"],
    }),
    __metadata("design:type", String)
], Agent.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        index: true,
        trim: true,
    }),
    __metadata("design:type", String)
], Agent.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Email is required"],
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please provide a valid email",
        ],
    }),
    __metadata("design:type", String)
], Agent.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Address is required"],
        trim: true,
        maxlength: [500, "Address cannot exceed 500 characters"],
    }),
    __metadata("design:type", String)
], Agent.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        required: [true, "At least one locality is required"],
        validate: {
            validator: (localities) => localities.length > 0,
            message: "At least one locality is required",
        },
    }),
    __metadata("design:type", Array)
], Agent.prototype, "localities", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: [true, "Experience is required"],
        min: [0, "Experience cannot be negative"],
        max: [70, "Please provide valid experience"],
    }),
    __metadata("design:type", Number)
], Agent.prototype, "experience", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        default: null,
    }),
    __metadata("design:type", Object)
], Agent.prototype, "photo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must contain at least 6 characters"],
        select: false,
    }),
    __metadata("design:type", String)
], Agent.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [exports.CertificationSchema],
        default: [],
    }),
    __metadata("design:type", Array)
], Agent.prototype, "certifications", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        default: [],
    }),
    __metadata("design:type", Array)
], Agent.prototype, "expertise", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        maxlength: [1000, "Bio cannot exceed 1000 characters"],
        default: "",
    }),
    __metadata("design:type", String)
], Agent.prototype, "bio", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(AgentStatus),
        default: AgentStatus.PENDING,
    }),
    __metadata("design:type", String)
], Agent.prototype, "status", void 0);
exports.Agent = Agent = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        versionKey: false,
        collection: "agents",
    })
], Agent);
exports.AgentSchema = mongoose_1.SchemaFactory.createForClass(Agent);
exports.AgentSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt_1.default.hash(this.password, 12);
});
exports.AgentSchema.index({
    localities: 1,
    status: 1,
});
exports.AgentSchema.index({
    expertise: 1,
    status: 1,
});
//# sourceMappingURL=agent.schema.js.map