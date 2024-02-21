import { ProductCategory } from "src/apis/productsCategory/entities/productCategory.entity";
import { ProductSaleslocation } from "src/apis/productsSalesLocation/entities/productSalesLocation.entity";
import { ProductTag } from "src/apis/productsTags/entities/productTags.entity";
import { User } from "src/apis/users/entities/user.entity";
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    isSoldout: boolean;
    productSalesLocation: ProductSaleslocation;
    productCategory: ProductCategory;
    user: User;
    productTags: ProductTag[];
    deletedAt: Date;
}
