import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.post("/boards", function (req, res) {
  //1.브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log("==============");
  console.log(req.body);

  //2.DB에 데이터 저장하기

  //3.DB에 저장된 결과를 브라우저에 응답 주기
  res.send("게시물 등록에 성공하였습니다");
});
app.listen(3000);

app.post("/tokens/Phone", function (req, res) {
  const myPhone = req.body.qqq;
  const isValid = checkPhone(myPhone);
  console.log(myPhone);
  if (isValid === false) return;
  const token = getToken();
  sendTokenToSMS(myPhone, token);
  res.send(`${myPhone}으로 인증번호가 발송되었습니다`);
});
