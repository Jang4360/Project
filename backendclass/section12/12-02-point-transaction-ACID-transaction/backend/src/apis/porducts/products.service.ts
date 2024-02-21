import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {
    IProductsServiceCheckSoldout,
    IProductsServiceCreateInput,
    IProductsServiceFindOne,
    IProductsServiceUpdate,
} from "./interfaces/products.service.interface";
import { ProductsSalesLocationsService } from "../productsSalesLocation/productsSalesLocations.service";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) // InjectRepository는 typeORM에서 제공하는 기능
        private readonly productsRepository: Repository<Product>, // productsRepository에 Product라는 type을 지정해줌

        private readonly productsSalesLocationService: ProductsSalesLocationsService,
    ) {}

    // 상품 여러개 조회하기
    findAll(): Promise<Product[]> {
        return this.productsRepository.find({
            relations: ["productSalesLocation"],
        }); // find는 여러개 조회
    }

    // 상품 하나만 조회하기
    findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
        //IProductsServiceFindOne는 Idd의 type 지정해 주는 interface, Promise<Product>는 return type
        return this.productsRepository.findOne({
            where: { id: productId },
            relations: ["productSalesLocation"],
        }); // findOne은 한개 조회 id가 Idd인 것을 찾아서 return
    }

    async create({
        createProductInput,
    }: IProductsServiceCreateInput): Promise<Product> {//product 처리가 시간이 걸리기에 promise로 비동기처리 해야한다.
        //1. 상품 하나만 등록할 때 사용하는 방법
        // const result = this.productsRepository.save({
        //     ...createProductInput, // createProductInput에 있는 모든 것을 가져와 db table에 저장

        //======== 하드코딩 방식
        // name: "마우스",
        // description: "로지텍 마우스",
        // price: 3000,

        //result안에는 무엇이 있을까?
        //name: "마우스",
        //description: "로지텍 마우스",
        //price: 3000,
        //});

        //2. 상품과 상품 거래위치를 같이 등록하는 방법
        const { productSalesLocation, ...product } = createProductInput;

        const result = await this.productsSalesLocationService.create({
            productSalesLocation, //                                     //서비스를 타고 가야 하는 이유는? 레파지토리에 직접 접근하면 검증 로직을 통일시킬 수 없다.
        });

        const result2 = this.productsRepository.save({
            ...product,
            productSaleslocation: result, //result 통째로 넣기 vs id만 넣기(id만 조회가능)

            //하나하나 나열하는 방식
            // name: product.name,
            // description: product.description,
            // price: product.price,
            // productSaleslocation: {
            //    id: result.id,
            //},
        });
        return result2;
    }

    async update({
        productId,
        updateProductInput,
    }: IProductsServiceUpdate): Promise<Product> {
        // 기존에 있는 내용을 재사용해서 로직을 통일하기
        const product = await this.findOne({ productId });
        //검증은 서비스에서 하기
        this.checkSoldout({ product });

        //this.productsRepository.create => DB접속이랑 관련없음, 등록을 위해서 빈 껍데기 객체 만듧
        //this.productsRepository.insert => 등록만 하고 등록된 결과값을 반환하지 않음, 결과를 객체로 못돌려받는 등록방법
        //this.productsRepository.update => 수정하고 수정된 결과 값을 반환하지 않음, 결과를 객체로 못돌려받는 수정방법

        // .save => 등록하고 등록된결과 값을 반환해서 가져옴, save 함수안에 id가 없으면 등록/ id가 있으면 수정
        const result = this.productsRepository.save({
            ...product, //=========spread시키기===========수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려받고 싶을 때
            ...updateProductInput, //수정된 것이 있으면 위의 product객체를 무시하고 updateProductInput안의 객체로 덮어씌움
        });
        return result;
    }
    //예외 처리 => checkSoldout을 함수로 만드는 이유: 수정 및 삭제시 같은 검증 로직을 사용하기 위해
    checkSoldout({ product }: IProductsServiceCheckSoldout): void {
        if (product.isSoldout) {
            throw new UnprocessableEntityException( // throw는 바로 에러를 던져버림
                "이미 판매 완료된 상품입니다.",
            );
        }
        // if (product.isSoldout) {
        //     throw new HttpException(
        //         "이미 판매 완료된 상품입니다.",
        //         HttpStatus.UNPROCESSABLE_ENTITY);
        //}
    }
    async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
        //1. 실제 삭제
        //const result = await this.productsRepository.delete({ id: productId });
        //return result.affected ? true : false; //affected는 영향이 갔는지 확인. 반환값이 1이면 true 영향이 가서 삭제가 됐다, 0이면 false

        //2. soft 삭제 - isDeleted(직접구현)
        //this.productsRepository.update({ id: productId }, { isDeleted: true });

        //3. soft 삭제 - deletedAt 삭제된 날짜도 기록(직접구현)
        //this.productsRepository.update({ id: productId }, { deletedAt: newDate() });

        //4. soft 삭제 - typeORM에서 제공하는 softRemove
        // this.productsRepository.softRemove({ id: productId }); //단점: id로만 삭제가능
        //                                                        //장점: 여러 id한번에 지우기 가능
        //                                                        // .softRemove([{ id: qqq }, { id: www }], { id: eee });
        //5. soft 삭제 - typeORM에서 제공하는 softDelete
        const result = await this.productsRepository.softDelete({
            id: productId,
        }); //                                                   // 단점: 여러 id 한번에 지우기 불가능
        return result.affected ? true : false;
        //                                                       //장점: id뿐만 아니라 다른 컬럼으로도 삭제 가능
    }
}
interface IProductsServiceDelete {
    productId: string;
}
