import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/porducts/entities/product.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class ProductTag {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @ManyToMany(() => Product, (products) => products.productTags)
    @Field(() => [Product])
    products: Product[];
}
