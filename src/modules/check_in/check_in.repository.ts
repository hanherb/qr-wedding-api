import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Invitation } from "src/entities/invitation.entity"
import { DeepPartial, Repository } from "typeorm"

@Injectable()
export class CheckInRepository {
    constructor(
        @InjectRepository(Invitation)
        private readonly invitationRepository: Repository<Invitation>
    ) {}

    async getOne(id: string): Promise<Invitation> {
        return await this.invitationRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async save(data: DeepPartial<Invitation>): Promise<Invitation> {
        return await this.invitationRepository.save(data)
    }
}