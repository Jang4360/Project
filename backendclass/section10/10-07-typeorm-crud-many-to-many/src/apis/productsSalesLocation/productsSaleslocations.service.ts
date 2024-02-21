import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProductSalesLocation } from "./entities/productSalesLocation.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsSaleslocationsService {
    constructor(
        @InjectRepository(ProductSalesLocation)
        private readonly productsSaleslocaitonsRepository: Repository<ProductSalesLocation>,
    ) {}

    create({ productSaleslocation }) {
        return this.productsSaleslocaitonsRepository.save({
            ...productSaleslocation,
        });
    }
}
