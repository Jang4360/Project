import { getDay } from "./utils.js";
import nodemailer from "nodemailer";

export function checkEmail(email) {
  if (email.includes("@") === false || email === undefined) {
    console.log("유효한 이메일이 아닙니다.");
    return false;
  } else {
    return true;
  }
}
export function makeTemplate({ name, age, email }) {
  const template = `
    <html>
        <body>
            <h1>안녕하세요 ${name}님</h1>
            <hr/>
            <div>이름 : ${name}</div>
            <div>나이 : ${age}</div>
            <div>학교 : ${email}</div>
            <div>가입일 : ${getDay()}</div>
        </body>
    </html>
    `;
  return template;
}
export async function sendTemplateToEmail({ name, email, template }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jooyoon4360@gmail.com",
      pass: "nsvpeogdtgvfwmdd",
    },
  });
  const res = await transporter.sendMail({
    from: "jooyoon4360@gmail.com",
    to: email,
    subject: `${name}님 회원가입을 축하드립니다.`,
    html: template,
  });
  console.log(res);
  //console.log(`${name}님 ${email}로 ${template}이 발송되었습니다.`);
}
