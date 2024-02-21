import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductSaleslocation } from "./entities/productSalesLocation.entity";

@Injectable()
export class ProductsSaleslocationsService {
    constructor(
        @InjectRepository(ProductSaleslocation)
        private readonly productsSaleslocaitonsRepository: Repository<ProductSaleslocation>,
    ) {}

    create({ productSaleslocation }) {
        return this.productsSaleslocaitonsRepository.save({
            ...productSaleslocation,
        });
    }
}
