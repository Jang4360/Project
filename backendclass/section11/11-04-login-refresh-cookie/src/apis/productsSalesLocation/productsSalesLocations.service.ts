import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProductSalesLocation } from "./entities/productSalesLocation.entity";
import { InjectRepository } from "@nestjs/typeorm";

//검증로직을 salesLocation.service.ts에서 거쳐가도록 하기
@Injectable()
export class ProductsSalesLocationsService {
    constructor(
        @InjectRepository(ProductSalesLocation)
        private readonly productsSalesLocationsRepository: Repository<ProductSalesLocation>,
    ) {}
    create({ productSalesLocation }) {
        return this.productsSalesLocationsRepository.save({
            ...productSalesLocation,
        });
    }
}
