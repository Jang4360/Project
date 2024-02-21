import { Repository } from "typeorm";
import { ProductSaleslocation } from "./entities/productSalesLocation.entity";
export declare class ProductsSaleslocationsService {
    private readonly productsSaleslocaitonsRepository;
    constructor(productsSaleslocaitonsRepository: Repository<ProductSaleslocation>);
    create({ productSaleslocation }: {
        productSaleslocation: any;
    }): any;
}
