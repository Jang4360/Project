import express from 'express';
import {CashService} from './cash.js'
import {ProductService} from './product.js'

const app=express();

//상품 구매하기 API
app.get('/products/buy',(req,res)=>{
    //1. 가진 돈 검증 (대략 10줄)
    const cashService = new CashService()
    const hasMoney = cashService.checkValue()
    //2. 판매 여부 검증 (대략 10줄)
    const productService = new ProductService()
    const isSoldout = ProductService.checkSoldout()
    //3. 상품 구매하는 코드 
    if(hasMoney && !isSoldout){
        res.send("상품 구매 완료")
    }
})
app.listen(3000)

//상품 환불하기 API
app.post("/products/refund",(req,res)=>{
    // 1. 판매여부 검증
    const productService=new ProductService()
    const isSoldout = productService.checkSoldout()
    // 2. 상품 환불하는 코드
    if(isSoldout){
        res.send("상품 환불 완료")
    }
})

