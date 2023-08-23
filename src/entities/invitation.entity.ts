import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Invitation {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    qrcode: string

    @Column()
    check_in_time: Date
}