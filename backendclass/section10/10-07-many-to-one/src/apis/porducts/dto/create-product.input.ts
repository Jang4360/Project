import { Field, InputType, Int } from "@nestjs/graphql";
import { Min } from "class-validator";
import { ProductSaleslocationInput } from "src/apis/productsSalesLocation/entities/dto/product-saleslocation.input";

//create-product.input.ts
@InputType()
export class CreateProductInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Min(0) //0보다 작으면 안됨
    @Field(() => Int)
    price: number;

    @Field(() => ProductSaleslocationInput)
    productSaleslocation: ProductSaleslocationInput;

    @Field(() => String)
    productCategoryId: string;
}
