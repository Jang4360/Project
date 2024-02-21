import express from 'express';
import {checkPhone, getToken, sendTokenToSMS} from './phone.js'

const app=express();
app.use(express.json());

app.get('/boards',function(req,res){
    //1.DB에서 게시물 데이터 가져오기
    const result=[
        {number:1, writer:"철수", title:"안녕하세요", contents:"반갑습니다"},
        {number:2, writer:"영희", title:"안녕하세요", contents:"반갑습니다"},
        {number:3, writer:"훈이", title:"안녕하세요", contents:"반갑습니다"},
    ]
    console.log(req.body)
    res.send(result)
    //2.가져온 데이터를 브라우저에 응답하기
})

app.post('/boards',function(req,res){
    //1.브라우저에서 보내준 데이터 확인하기
    console.log(req)
    console.log("==============")
    console.log(req.body)

    //2.DB에 데이터 저장하기
    
    //3.DB에 저장된 결과를 브라우저에 응답 주기
    res.send('게시물 등록에 성공하였습니다')
})

app.post('/tokens/Phone',function(req,res){
    const myPhone = req.body.qqqq
    const isValid = checkPhone(myPhone);
    if (isValid===false) return;
    const token = getToken();
    sendTokenToSMS(myPhone,token);
    res.send(`${myPhone}으로 인증번호가 발송되었습니다`)
})
app.listen(3000)
