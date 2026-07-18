import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentAuthGuard } from 'src/AuthGuard/agent.AuthGuard';
import { Certification } from 'src/database/schema/agent.schema';
import { AgentLoginDto } from 'src/utils/dto';

@Controller('agent')
export class AgentController {
    constructor(
        private readonly agentService: AgentService
    ) { }

    @Post('register')
    async registerAgent(@Body() body: {
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
    }) {
        const { name, email, phone, address, localities, experience, password, photo, certifications, expertise, bio } = body;
        return this.agentService.registerAgent(name, email, phone, address, localities, experience, password, photo, certifications, expertise, bio);
    }

    @Post('login')
    async loginAgent(@Body() body: AgentLoginDto) {
        return this.agentService.loginAgent(body.email, body.password);
    }

    @Get('')
    @UseGuards(AgentAuthGuard)
    async getAgent(@Req() req: any) {
        const id = req.user.id;
        return this.agentService.getAgent(id);
    }
}
