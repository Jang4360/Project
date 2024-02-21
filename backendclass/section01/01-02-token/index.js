function createNewTokenPhone(qqq){
    if (qqq.length<10 || qqq.length>11){
        console.log("휴대폰 자릿수가 맞지 않습니다.")
        return
    }
    const token=String(Math.floor(Math.random()*1000000)).padStart(6,"0")
    console.log(token)
    console.log(`${qqq}로 ${token}이 발송되었습니다`)
}
createNewTokenPhone("01027891000")