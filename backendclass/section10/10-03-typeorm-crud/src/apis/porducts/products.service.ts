import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {
    IProductsServiceCreateInput,
    IProductsServiceFindOne,
} from "./interfaces/products.service.interface";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) // InjectRepository는 typeORM에서 제공하는 기능
        private readonly productsRepository: Repository<Product>, // productsRepository에 Product라는 type을 지정해줌
    ) {}

    // 상품 여러개 조회하기
    findAll(): Promise<Product[]> {
        return this.productsRepository.find(); // find는 여러개 조회
    }

    // 상품 하나만 조회하기
    findOne({ Idd }: IProductsServiceFindOne): Promise<Product> {
        //IProductsServiceFindOne는 Idd의 type 지정해 주는 interface, Promise<Product>는 return type
        return this.productsRepository.findOne({ where: { id: Idd } }); // findOne은 한개 조회 id가 Idd인 것을 찾아서 return
    }

    create({
        createProductInput,
    }: IProductsServiceCreateInput): Promise<Product> {
        //product 처리가 시간이 걸리기에 promise로 비동기처리 해야한다.
        const result = this.productsRepository.save({
            ...createProductInput, // createProductInput에 있는 모든 것을 가져와 db table에 저장

            //======== 하드코딩 방식
            // name: "마우스",
            // description: "로지텍 마우스",
            // price: 3000,

            //result안에는 무엇이 있을까?
            //name: "마우스",
            //description: "로지텍 마우스",
            //price: 3000,
        });
        return result;
    }
}
