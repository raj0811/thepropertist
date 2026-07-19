import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
export declare enum AgentStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED",
    BLOCKED = "BLOCKED"
}
export declare class Certification {
    name?: string;
    certificateNumber?: string;
    documentUrl?: string;
    issuedBy?: string;
}
export declare const CertificationSchema: MongooseSchema<Certification, import("mongoose").Model<Certification, any, any, any, any, any, Certification>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Certification, import("mongoose").Document<unknown, {}, Certification, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Certification & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string | undefined, Certification, import("mongoose").Document<unknown, {}, Certification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Certification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    certificateNumber?: import("mongoose").SchemaDefinitionProperty<string | undefined, Certification, import("mongoose").Document<unknown, {}, Certification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Certification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    documentUrl?: import("mongoose").SchemaDefinitionProperty<string | undefined, Certification, import("mongoose").Document<unknown, {}, Certification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Certification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    issuedBy?: import("mongoose").SchemaDefinitionProperty<string | undefined, Certification, import("mongoose").Document<unknown, {}, Certification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Certification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Certification>;
export declare class Agent {
    agentId: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    localities: string[];
    experience: number;
    photo?: string | null;
    password: string;
    certifications: Certification[];
    expertise: string[];
    bio?: string;
    status: AgentStatus;
    createdAt: Date;
    updatedAt: Date;
}
export type AgentDocument = HydratedDocument<Agent>;
export declare const AgentSchema: MongooseSchema<Agent, import("mongoose").Model<Agent, any, any, any, any, any, Agent>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Agent, import("mongoose").Document<unknown, {}, Agent, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    agentId?: import("mongoose").SchemaDefinitionProperty<string, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    localities?: import("mongoose").SchemaDefinitionProperty<string[], Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    experience?: import("mongoose").SchemaDefinitionProperty<number, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    photo?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    password?: import("mongoose").SchemaDefinitionProperty<string, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    certifications?: import("mongoose").SchemaDefinitionProperty<Certification[], Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expertise?: import("mongoose").SchemaDefinitionProperty<string[], Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    bio?: import("mongoose").SchemaDefinitionProperty<string | undefined, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<AgentStatus, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Agent>;
