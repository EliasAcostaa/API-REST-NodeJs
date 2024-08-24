import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
    })
    createdAd!: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
    })
    uptatedAd!: Date;
}


//id
//created_ad
//updated_ad
