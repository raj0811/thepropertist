import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";
import {
    Prop,
    Schema,
    SchemaFactory,
} from "@nestjs/mongoose";
import {
    HydratedDocument,
    Schema as MongooseSchema,
} from "mongoose";

export enum AgentStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED",
    BLOCKED = "BLOCKED",
}

@Schema({
    _id: false,
    versionKey: false,
})
export class Certification {
    @Prop({
        required: true,
        trim: true,
    })
    name?: string;

    @Prop({
        trim: true,
    })
    certificateNumber?: string;

    @Prop({
        trim: true,
    })
    documentUrl?: string;

    @Prop({
        trim: true,
    })
    issuedBy?: string;
}

export const CertificationSchema =
    SchemaFactory.createForClass(Certification);

@Schema({
    timestamps: true,
    versionKey: false,
    collection: "agents",
})
export class Agent {
    @Prop({
        type: String,
        unique: true,
        index: true,
        immutable: true,
        default: () =>
            `AGT-${randomUUID()
                .replaceAll("-", "")
                .slice(0, 10)
                .toUpperCase()}`,
    })
    agentId: string;

    @Prop({
        type: String,
        required: [true, "Agent name is required"],
        trim: true,
        minlength: [2, "Name must contain at least 2 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"],
    })
    name: string;

    @Prop({
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        index: true,
        trim: true,
    })
    phone: string;

    @Prop({
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
    })
    email: string;

    @Prop({
        type: String,
        required: [true, "Address is required"],
        trim: true,
        maxlength: [500, "Address cannot exceed 500 characters"],
    })
    address: string;

    @Prop({
        type: [String],
        required: [true, "At least one locality is required"],
        validate: {
            validator: (localities: string[]) => localities.length > 0,
            message: "At least one locality is required",
        },
    })
    localities: string[];

    @Prop({
        type: Number,
        required: [true, "Experience is required"],
        min: [0, "Experience cannot be negative"],
        max: [70, "Please provide valid experience"],
    })
    experience: number;

    @Prop({
        type: String,
        trim: true,
        default: null,
    })
    photo?: string | null;

    @Prop({
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must contain at least 6 characters"],
        select: false,
    })
    password: string;

    @Prop({
        type: [CertificationSchema],
        default: [],
    })
    certifications: Certification[];

    @Prop({
        type: [String],
        default: [],
    })
    expertise: string[];

    @Prop({
        type: String,
        trim: true,
        maxlength: [1000, "Bio cannot exceed 1000 characters"],
        default: "",
    })
    bio?: string;

    @Prop({
        type: String,
        enum: Object.values(AgentStatus),
        default: AgentStatus.PENDING,
    })
    status: AgentStatus;

    createdAt: Date;
    updatedAt: Date;
}

export type AgentDocument = HydratedDocument<Agent>;

export const AgentSchema =
    SchemaFactory.createForClass(Agent);

AgentSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 12);
});

AgentSchema.index({
    localities: 1,
    status: 1,
});

AgentSchema.index({
    expertise: 1,
    status: 1,
});