import { ProductSaleslocationInput } from "src/apis/productsSalesLocation/entities/dto/product-saleslocation.input";
export declare class CreateProductInput {
    name: string;
    description: string;
    price: number;
    productSaleslocation: ProductSaleslocationInput;
    productCategoryId: string;
}
