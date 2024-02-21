import { InputType, OmitType } from "@nestjs/graphql";
import { ProductSalesLocation } from "../productSalesLocation.entity";

@InputType()
export class ProductSaleslocationInput extends OmitType(
    ProductSalesLocation,
    ["id"],
    InputType,
) {}
