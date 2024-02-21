import express from 'express';
import {ProductController} from './MVC/controllers/product.controllers.js'
import {CouponController} from './MVC/controllers/coupon.controllers.js'
const app=express();

//상품API 
const productController=new ProductController()
app.post("/products/buy",productController.buyProduct) //상품 구매하기 API
app.post("/products/refund",productController.refundProduct) //상품 환불하기 API

//쿠폰API
const couponController=new CouponController()
app.post("/coupons/buy",couponController.buyCoupon) //상품권을 돈주고 구매하는 API 
app.listen(3000)