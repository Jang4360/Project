import { Product } from 'src/apis/porducts/entities/product.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductTag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @JoinTable()
    @ManyToMany(() => Product, (products) => products.productTags)
    products: Product[];
}
