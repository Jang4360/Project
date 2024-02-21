export class CouponController{
    
    CashService
    
    constructor(cashService){
        this.CashService=cashService
    }
    buyCoupon=(req,res)=>{

        //1. 가진돈 검증 
        const hasMoney = this.CashService.checkValue()
        
        //2. 상품권 구매하는 코드
        if (hasMoney){
            res.send("상품권 구매 완료")
        }
    }
}