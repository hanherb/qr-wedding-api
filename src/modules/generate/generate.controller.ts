import { Controller, Get } from "@nestjs/common";
import { GenerateService } from "./generate.service";

@Controller()
export class GenerateController {
    constructor(
        private readonly generateService: GenerateService
    ) {}

    @Get('/generate')
    async generateInvitationQR() {
        return await this.generateService.generateInvitationQR()
    }
}