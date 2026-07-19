"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
let AgentService = class AgentService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async registerAgent(name, email, phone, address, localities, experience, password, photo, certifications, expertise, bio) {
        try {
            const normalizedEmail = email.trim().toLowerCase();
            const normalizedPhone = phone.trim();
            const existingAgent = await this.databaseService.agentModel
                .findOne({
                $or: [
                    { email: normalizedEmail },
                    { phone },
                ],
            })
                .select("email phone")
                .lean();
            if (existingAgent) {
                if (existingAgent.email === normalizedEmail) {
                    throw new common_1.ConflictException("Email is already registered");
                }
                if (existingAgent.phone === normalizedPhone) {
                    throw new common_1.ConflictException("Phone number is already registered");
                }
            }
            const agent = await this.databaseService.agentModel.create({
                name,
                email: normalizedEmail,
                phone: normalizedPhone,
                password,
                address,
                localities,
                experience,
                photo,
                certifications: certifications ?? [],
                expertise: expertise ?? [],
                bio: bio ?? "",
            });
            const token = jwt.sign({ id: agent._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return {
                msg: "Agent Registered Successfully",
                token
            };
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async loginAgent(email, password) {
        try {
            const normalizedEmail = email.trim().toLowerCase();
            const agent = await this.databaseService.agentModel.findOne({ email: normalizedEmail }).select("+password");
            if (!agent) {
                throw new common_1.NotFoundException("Agent not found");
            }
            const isPasswordValid = await bcrypt.compare(password, agent.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException("Invalid password");
            }
            const token = jwt.sign({ id: agent._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return {
                msg: "Agent Logged In Successfully",
                token
            };
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async getAgent(id) {
        try {
            const agent = await this.databaseService.agentModel.findById(id).select('-password -createdAt -updatedAt -__v');
            if (!agent) {
                throw new common_1.NotFoundException("Agent not found");
            }
            return agent;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async verifyAgentToken(token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            return decodedToken;
        }
        catch (e) {
            throw new common_1.BadRequestException("Invalid Token");
        }
    }
};
exports.AgentService = AgentService;
exports.AgentService = AgentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AgentService);
//# sourceMappingURL=agent.service.js.map