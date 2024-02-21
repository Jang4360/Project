import { InputType, OmitType } from "@nestjs/graphql";
import { ProductSaleslocation } from "../productSalesLocation.entity";

@InputType()
export class ProductSaleslocationInput extends OmitType(
    ProductSaleslocation,
    ["id"],
    InputType,
) {}
