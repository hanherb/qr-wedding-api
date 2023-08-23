import { Controller, Get, Param, Post } from "@nestjs/common";
import { CheckInService } from "./check_in.service";

@Controller()
export class CheckInController {
    constructor(
        private readonly checkInService: CheckInService
    ) {}

    @Post('/check-in/:id')
    async generateInvitationQR(@Param('id') id: string) {
        return await this.checkInService.checkIn(id)
    }
}