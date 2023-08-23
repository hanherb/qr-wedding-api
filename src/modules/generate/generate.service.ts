import { Injectable } from "@nestjs/common";
import { GenerateRepository } from "./generate.repository";
import { rawInvitations } from "src/data/invitation";
import { randomChar } from "src/helper/crypto";

@Injectable()
export class GenerateService {
    constructor(
        private readonly generateRepository: GenerateRepository
    ) {}

    async generateInvitationQR() {
        const invitations = await this.generateRepository.getList()
        if(invitations.length > 0) {
            return invitations
        }

        for(const i of rawInvitations) {
            const invitationId = randomChar(8)
            Object.assign(i, { 
                id: invitationId,
                qrcode: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${invitationId}`,
                check_in_time: null
            })

            await this.generateRepository.save(i)
        }

        return rawInvitations
    }
}