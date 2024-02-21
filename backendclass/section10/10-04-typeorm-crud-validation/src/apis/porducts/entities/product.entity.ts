import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProductCategory } from "src/apis/productsCategory/entities/productCategory.entity";
import { ProductSalesLocation } from "src/apis/productsSalesLocation/entities/productSalesLocation.entity";
import { ProductTag } from "src/apis/productsTags/entities/productTags.entity";
import { User } from "src/apis/users/entities/user.entity";
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity() //typeORM에서 사용하는 entity
@ObjectType() //graphql에서 사용하는 entity
export class Product {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    id: string;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column()
    description: string;

    @Field(() => Int)
    @Column()
    price: number;

    @Field(() => Boolean)
    @Column({ default: false }) //실행하기 전 기본값이 false
    isSoldout: boolean;

    @JoinColumn()
    @OneToOne(() => ProductSalesLocation)
    @Field(() => ProductSalesLocation)
    productSalesLocation: ProductSalesLocation;

    @ManyToOne(() => ProductCategory)
    @Field(() => ProductCategory)
    productCategory: ProductCategory;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @JoinTable()
    @ManyToMany(() => ProductTag, (productTags) => productTags.products)
    @Field(() => [ProductTag])
    productTags: ProductTag[];
}
