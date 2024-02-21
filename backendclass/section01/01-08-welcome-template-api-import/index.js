function checkEmail(email){
    if((email.includes("@")===false)||(email===undefined)){
        console.log("유효한 이메일이 아닙니다.") 
        return false
    }else{
        return true
    }

}
function makeTemplate({name,age,email,createdAt}){
    const template=`
    <html>
        <body>
            <h1>안녕하세요 ${name}님</h1>
            <hr/>
            <div>이름 : ${name}</div>
            <div>나이 : ${age}</div>
            <div>학교 : ${email}</div>
            <div>가입일 : ${createdAt}</div>
        </body>
    </html>
    `
    return template
}
function sendTemplateToEmail({name,email,template}){
    console.log(`${name}님 ${email}로 ${template}이 발송되었습니다.`)
}


function createUser({name,age,email,createdAt}){
    const isValid=checkEmail(email)
    if (isValid===false) return;
    const template=makeTemplate({name,age,email,createdAt})
    sendTemplateToEmail({template,email,name})
}  

function getDay(){
    const day= String(new Date().getDay()).padStart(2,"0")
    const month= String(new Date().getMonth()+1).padStart(2,"0")
    const year= new Date().getFullYear()
    const date= year+'-'+month+'-'+day
    return date
}

const name="홍길동"
const age=20
const email="jjj111@google.com"
const createdAt=getDay()
const info={name,age,email,createdAt}
createUser(info)