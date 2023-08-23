import { Module } from "@nestjs/common";
import { CheckInController } from "./check_in.controller";
import { CheckInRepository } from "./check_in.repository";
import { CheckInService } from "./check_in.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invitation } from "src/entities/invitation.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Invitation
        ])
    ],
    controllers: [
        CheckInController
    ],
    providers: [
        CheckInService,
        CheckInRepository
    ],
    exports: [
        CheckInService,
        CheckInRepository
    ]
})
export class CheckInModule {}