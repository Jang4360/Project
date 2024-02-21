import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity';
import { ProductSalesLocation } from 'src/apis/productsSalesLocation/entities/productSalesLocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTags.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column({ default: false }) //실행하기 전 기본값이 false
    isSoldout: boolean;

    @JoinColumn()
    @OneToOne(() => ProductSalesLocation)
    productSalesLocation: ProductSalesLocation;

    @ManyToOne(() => ProductCategory)
    productCategory: ProductCategory;

    @ManyToOne(() => User)
    user: User;
    @JoinTable()
    @ManyToMany(() => ProductTag, (productTags) => productTags.products)
    productTags: ProductTag[];
}
