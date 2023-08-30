import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { CheckInRepository } from "./check_in.repository"
import { Invitation } from "src/entities/invitation.entity"
import { RemoveTimezoneString } from "src/helper/datetime"

@Injectable()
export class CheckInService {
    constructor(
        private readonly checkInRepository: CheckInRepository
    ) {}

    async checkIn(id: string): Promise<Invitation> {
        const invitation = await this.checkInRepository.getOne(id)
        if(!invitation) {
            throw new NotFoundException(`invitation with id ${id} not found`)
        }

        if(invitation.check_in_time) {
            const redeemedOn = await RemoveTimezoneString(invitation.check_in_time)
            throw new ForbiddenException(`you already checked in at ${redeemedOn}`)
        }

        invitation.check_in_time = new Date()
        
        return await this.checkInRepository.save(invitation)
    }
}