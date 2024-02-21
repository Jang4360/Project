import { CreateProductInput } from "../dto/create-product.input";

export interface IProductsServiceCreateInput {
    createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
    Idd: string;
}
