import {ProductService} from './services/product.service.js'

export class ProductController{

    cashService
    productService
    constructor(cashService,productService){
        this.myCashService=cashService
        this.myProductService=productService
    }
    buyProduct = (req,res)=>{
        //1. 가진 돈 검증 (대략 10줄)
        //const cashService=new CashService()
        const hasMoney = this.cashService.checkValue()

        //2. 판매 여부 검증 (대략 10줄)
        //const productService = new ProductService()
        const isSoldout = this.productService.checkSoldout()

        //3. 상품 구매하는 코드 
        if(hasMoney && !isSoldout){
            res.send("상품 구매 완료")
        }
    }

    refundProduct = (req,res)=>{
        // 1. 판매여부 검증
        const productService=new this.productService()
        const isSoldout = productService.checkSoldout()

        // 2. 상품 환불하는 코드
        if(isSoldout){
            res.send("상품 환불 완료")
        }
    }
}