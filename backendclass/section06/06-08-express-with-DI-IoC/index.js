import express from 'express';
import {ProductController} from './MVC/controllers/product.controllers.js'
import {CouponController} from './MVC/controllers/coupon.controllers.js'
import {CashService} from './MVC/controllers/services/cash.service.js'
import {PointService} from './MVC/controllers/services/point.service.js'
import {ProductService} from './MVC/controllers/services/product.service.js'

const app=express();                        // ===의존성 주입으로 발생하는 장점===
const cashService=new CashService()         // 1. new 한번으로 모든 곳에서 재사용 가능 (싱글톤 패턴)
const pointService=new PointService()       // 2. 의존성 주입으로 한번에 변경 가능 
const productService = new ProductService() // 3. 의존성 주입으로 쿠폰 구매방식을 포인트 결재로 안전하게 변경 가능 

                                            // ==부가설명==
                                            // 1.ProductController가 CashService에 의존하고 있음(CashService => 의존성)
                                            //   => 이 상황을 강한 결합 (tight-coupling)이라고 표현
                                            // 2. 이를 개선하기 위해 느슨한 결합(loose-coupling)을 적용
                                            //   => 의존성 주입 (Dependency Injection)을 적용
                                            //   => 이 역할을 대신 해주는 Next.js 기능 = IoC 컨테이너 (제어를 역전 -> 알아서 new해서 넣으줌. 즉, DI해줌)
                                            //                                  (Inversion of Control)
                                            // 3. 의존성 주입으로 싱글톤 패턴 구현 가능해짐 
                                            //   => 의존성 주입이면, 싱글톤 패턴인가? 그건 아니다  

//상품API 
const productController=new ProductController(cashService,productService)
app.post("/products/buy",productController.buyProduct) //상품 구매하기 API
app.post("/products/refund",productController.refundProduct) //상품 환불하기 API

//쿠폰API
const couponController=new CouponController(cashService)
app.post("/coupons/buy",couponController.buyCoupon) //상품권을 돈주고 구매하는 API 
app.listen(3000)
