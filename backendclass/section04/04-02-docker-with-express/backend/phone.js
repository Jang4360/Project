import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;
import "dotenv/config";

export function checkPhone(myPhone) {
  if (myPhone.length < 10 || myPhone.length > 11) {
    console.log("휴대폰 자리수가 맞지 않습니다.");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  return token;
}

export const sendTokenToSMS = async (myPhone, token) => {
  const API_KEY = process.env.API_KEY;
  const API_SECRET = process.env.API_SECRET;
  const messageService = new mysms(API_KEY, API_SECRET);
  const result = await messageService.sendOne({
    to: myPhone,
    from: "01027464360",
    text: `요청하신 인증번호는${token}입니다`,
  });
  console.log(result);
};
