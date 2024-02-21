import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkEmail, makeTemplate, sendTemplateToEmail } from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import mongoose from "mongoose";
import { Board } from './models/board.model.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get('/boards',async function(req,res){
  const result= await Board.find()
  res.send(result)
})

app.post("/boards", async function (req, res) {
  //1.브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log("==============");
  console.log(req.body);
  //2.DB에 데이터 저장하기
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents,
  });
  await board.save();
  //3.DB에 저장된 결과를 브라우저에 응답 주기
  res.send("게시물 등록에 성공하였습니다");
});


mongoose
  .connect("mongodb://my-database:27017/mydocker")
  .then(() => console.log("db 접속 성공"))
  .catch(() => console.log("db 접속 실패"));

app.listen(4000);
