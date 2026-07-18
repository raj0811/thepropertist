import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Certification } from 'src/database/schema/agent.schema';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AgentService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async registerAgent(
        name: string,
        email: string,
        phone: string,
        address: string,
        localities: string[],
        experience: number,
        password: string,
        photo?: string,
        certifications?: Certification[],
        expertise?: string[],
        bio?: string,
    ) {
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
                    throw new ConflictException("Email is already registered");
                }

                if (existingAgent.phone === normalizedPhone) {
                    throw new ConflictException("Phone number is already registered");
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
            }
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    async loginAgent(email: string, password: string) {
        try {
            const normalizedEmail = email.trim().toLowerCase();
            const agent = await this.databaseService.agentModel.findOne({ email: normalizedEmail }).select("+password");

            if (!agent) {
                throw new NotFoundException("Agent not found");
            }
            const isPasswordValid = await bcrypt.compare(password, agent.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException("Invalid password");
            }
            const token = jwt.sign({ id: agent._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return {
                msg: "Agent Logged In Successfully",
                token
            }
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    async getAgent(id: string) {
        try {
            const agent = await this.databaseService.agentModel.findById(id).select('-password -createdAt -updatedAt -__v');
            if (!agent) {
                throw new NotFoundException("Agent not found");
            }
            return agent
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    async verifyAgentToken(token: string) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            return decodedToken;
        } catch (e) {
            throw new BadRequestException("Invalid Token")
        }
    }
}
