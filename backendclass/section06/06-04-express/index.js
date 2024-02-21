import express from 'express';
const app=express();

//상품 구매하기 API
app.get('/products/buy',(req,res)=>{
    //1. 가진 돈 검증 (대략 10줄)
    //2. 판매 여부 검증 (대략 10줄)
    //3. 상품 구매하는 코드 
    //if(돈있음&&!판매완료){
    //    res.send("상품 구매 완료")
    //}
})
app.listen(3000)

//상품 환불하기 API
app.post("/products/refund",(req,res)=>{
// 1. 판매여부 검증
// 2. 상품 환불하는 코드
// if(판매완료){
//     res.send("상품 환불 완료")
//}
})