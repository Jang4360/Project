import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { User } from "src/apis/users/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

//자유 string이 아닌 정확한 타입을 지정해주는 것이 좋다.
export enum POINT_TRANSACTION_STATUS_ENUM {
    PAYMENT = "PAYMENT",
    CANCEL = "CANCEL",
}

//grphql에서 사용할 수 있도록 enum type등록
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
    name: "POINT_TRANSACTION_STATUS_ENUM",
});

// insert only table 기존 데이터 수정하지 않고 추가만 함
@Entity()
@ObjectType()
export class PointTransaction {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    impUid: string;

    @Column()
    @Field(() => Int)
    amount: number;

    @Column({ type: "enum", enum: POINT_TRANSACTION_STATUS_ENUM })
    @Field(() => String)
    status: POINT_TRANSACTION_STATUS_ENUM;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;
}
