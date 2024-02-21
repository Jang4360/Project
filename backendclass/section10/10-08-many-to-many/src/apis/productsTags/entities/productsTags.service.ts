import { Injectable } from "@nestjs/common";
import { ProductTag } from "./productTags.entity";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {
    IProductsTagsServiceBulkInsert,
    IProductsTagsServiceFindByNames,
} from "../interfaces/products-tags-service.interface";

@Injectable()
export class ProductsTagsService {
    constructor(
        @InjectRepository(ProductTag)
        private readonly productsTagsRepository: Repository<ProductTag>,
    ) {}
    findByNames({ tagNames }: IProductsTagsServiceFindByNames) {
        return this.productsTagsRepository.find({
            where: { name: In(tagNames) },
        });
    }

    bulkInsert({ names }: IProductsTagsServiceBulkInsert) {
        return this.productsTagsRepository.insert(names);
    }
}
