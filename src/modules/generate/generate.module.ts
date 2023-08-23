import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { GenerateService } from "./generate.service";
import { GenerateController } from "./generate.controller";
import { GenerateRepository } from "./generate.repository";
import { Invitation } from "src/entities/invitation.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Invitation
        ]),
        HttpModule
    ],
    controllers: [
        GenerateController
    ],
    providers: [
        GenerateService,
        GenerateRepository
    ],
    exports: [
        GenerateService,
        GenerateRepository
    ]
})
export class GenerateModule {}