import { checkEmail, makeTemplate, sendTemplateToEmail } from "./email.js";

function createUser({ name, age, email }) {
  const isValid = checkEmail(email);
  if (isValid === false) return;
  const template = makeTemplate({ name, age, email });
  sendTemplateToEmail({ template, email, name });
}

const name = "홍길동";
const age = 20;
const email = "jjj111@google.com";
const info = { name, age, email };
createUser(info);
