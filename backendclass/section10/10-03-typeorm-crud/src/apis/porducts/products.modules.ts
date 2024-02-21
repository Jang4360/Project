import { Module } from "@nestjs/common";
import { ProductsResolver } from "./products.resolver";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            //forFeature는 typeORM기능중 특정 feature를 주입하고 싶을 때 사용
            Product, // product table에 접근하여 CRUD를 할 수 있게 해줌
        ]),
    ],
    providers: [
        ProductsResolver, //
        ProductsService,
    ],
})
export class ProductsModule {}
