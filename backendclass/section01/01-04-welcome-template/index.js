function welcomeTemplate({name,age,school,createdAt}){
    const myTemplate = `
    <html>
        <body>
            <h1>안녕하세요 ${name}님</h1>
            <hr/>
            <div>이름 : ${name}</div>
            <div>나이 : ${age}</div>
            <div>학교 : ${school}</div>
            <div>가입일 : ${createdAt}</div>
        </body>
    </html>`
    console.log(myTemplate)
}
const name = "홍길동"
const age = 20
const school = "토끼초등학교" 
const createdAt = "2021-01-01"
welcomeTemplate({name,age,school,createdAt})