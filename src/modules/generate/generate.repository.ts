import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Invitation } from "src/entities/invitation.entity";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class GenerateRepository {
    constructor(
        @InjectRepository(Invitation)
        private readonly invitationRepository: Repository<Invitation>
    ) {}

    async getList(): Promise<Invitation[]> {
        return await this.invitationRepository.find()
    }

    async save(data: DeepPartial<Invitation>): Promise<Invitation> {
        return await this.invitationRepository.save(data)
    }
}