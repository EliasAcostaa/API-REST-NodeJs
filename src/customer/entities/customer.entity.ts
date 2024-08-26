import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { UserEntity } from "../../user/entitites/user.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";

@Entity({name: "customer"})
export class CustomerEntity extends BaseEntity {

    @Column()
    adress!: string;

    @Column()
    dni!: number;

    @OneToOne(() => UserEntity, (user) => user.customer)
    @JoinColumn({name: "user_id"})
    user!: UserEntity;

    @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
    purchases!: PurchaseEntity[];
}