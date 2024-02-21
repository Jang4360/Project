import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class ProductSalesLocation {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    address: string;

    @Column()
    @Field(() => String)
    addressDetail: string;

    @Column({ type: "decimal", precision: 9, scale: 6 }) // 9자리중 소수점 6자리까지
    @Field(() => Float)
    lat: number;

    @Column({ type: "decimal", precision: 9, scale: 6 })
    @Field(() => Float)
    lng: number;

    @Column()
    @Field(() => Date)
    meetingTime: Date;
}
