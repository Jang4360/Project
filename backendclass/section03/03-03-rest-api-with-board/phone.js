export function checkPhone(myPhone){
    if(myPhone.length<10 || myPhone.length>11){
        console.log("휴대폰 자리수가 맞지 않습니다.")
        return false
    }else{
        return true
    }
}

export function getToken(){
    const token=String(Math.floor(Math.random()*1000000)).padStart(6,"0")
    return token
}

export function sendTokenToSMS(myPhone,token){
    console.log(`${myPhone}로 ${token}이 발송되었습니다`)
}