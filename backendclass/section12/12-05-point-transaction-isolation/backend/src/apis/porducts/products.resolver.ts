import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductsService } from "./products.service";
import { CreateProductInput } from "./dto/create-product.input";
import { Product } from "./entities/product.entity";
import { UpdateProductInput } from "./dto/update-product.input";

@Resolver()
export class ProductsResolver {
    constructor(
        private readonly productsService: ProductsService, //
    ) {}

    // 상품여러개 조회하기
    @Query(() => [Product]) // 여러개니까 배열로
    fetchProducts(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    // 상품하나만 조회하기
    @Query(() => Product)
    fetchProduct(
        @Args("Idd") productId: string, // Args는 graphql에서 받아오는 값
    ): Promise<Product> {
        return this.productsService.findOne({ productId });
    }

    // 상품 등록하기
    @Mutation(() => Product)
    createProduct(
        //@Args는 객체에 묶어 한번에 인자 받아오기 -> dto에 맞는 형식으로 받아옴
        @Args("createProductInput") createProductInput: CreateProductInput,
    ): Promise<Product> {
        //<<<<<브라우저에 결과 보내주는 2가지 방법 >>>>>
        //1. 등록된 내용이 담긴 객체를 그대로 보내기 --> query하기 편함
        return this.productsService.create({ createProductInput });

        //2. 결과 메시지만 간단히 보내주기
        //return "상품이 성공적으로 등록되었습니다.";
    }
    //수정하기
    @Mutation(() => Product)
    updateProduct(
        @Args("productID") productId: string,
        @Args("updateProductInput") updateProductInput: UpdateProductInput,
    ): Promise<Product> {
        return this.productsService.update({ productId, updateProductInput });
    }

    @Mutation(() => Boolean) //graphql에서 숫자는 number가 아닌 Int로 받아야함
    deleteProduct(
        @Args("productId") productId: string, //
    ): Promise<boolean> {
        return this.productsService.delete({ productId });
    }
}
