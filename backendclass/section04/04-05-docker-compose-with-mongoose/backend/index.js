import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkEmail, makeTemplate, sendTemplateToEmail } from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get('/boards',async function(req,res){
  const result=[
    {number:1, writer:"철수", title:"안녕하세요", contents:"반갑습니다"},
    {number:2, writer:"영희", title:"안녕하세요", contents:"반갑습니다"},
    {number:3, writer:"훈이", title:"안녕하세요", contents:"반갑습니다"},
  res.send(result)

  ]
})

app.post("/boards", function (req, res) {
  //1.브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log("==============");
  console.log(req.body);
  //2.DB에 데이터 저장하기
  //3.DB에 저장된 결과를 브라우저에 응답 주기
  res.send("게시물 등록에 성공하였습니다");
});

//phone에 토큰 보내기
app.post("/tokens/Phone", function (req, res) {
  const myPhone = req.body.qqq;
  const isValid = checkPhone(myPhone);
  console.log(myPhone);
  if (isValid === false) return;
  const token = getToken();
  sendTokenToSMS(myPhone, token);
  res.send(`${myPhone}으로 인증번호가 발송되었습니다`);
});

//email에 토큰 보내기
app.post("/users", function (req, res) {
  const { name, age, email } = req.body;
  const isValid = checkEmail(email);
  if (isValid === false) return;
  const template = makeTemplate({ name, age, email });
  sendTemplateToEmail({ template, email, name });
  res.send("가입완료");
});
mongoose
  .connect("mongodb://my-database:27017/mydocker")
  .then(() => console.log("db 접속 성공"))
  .catch(() => console.log("db 접속 실패"));

app.listen(3000);
