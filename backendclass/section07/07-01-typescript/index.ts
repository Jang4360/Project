//타입 추론
let aaa = "안녕하세요" //처음에 들어간 값이 string이기 때문에 string으로 고정
aaa=3

//타입명시
let bbb: string="반갑습니다"
bbb=10

//타입명시가 필요한 상황
let ccc: number | string = 1000
ccc="1000원"

//숫자타입
let ddd: number = 10
ddd="철수"

//불린타입
let eee = true
eee=false
eee="false" //true로 작동한다 

//배열타입
let fff: number[]=[1,2,3,4,5,'안녕하세요']
let ggg: string[]=['철수','영희',10,2]
let hhh: (string | number)[]=['철수','영희',10,2]

//객체타입
interface iProfile{
    name: string
    age: number|string
    school: string
    hobby?: string
}
const profile: iProfile = {
    name:'철수',
    age:10,
    school:"다람쥐초등학교"
}
profile.name='영희' //타입 추론으로는 이것만 가능 
profile.age='8살'
profile.hobby='코딩'

//함수타입 (어디서 몇번이든 호출 가능하여 타입추론 할 수 없음. 반드시 타입명시 필요)
const add=(num1: number, num2: number, uni: string):string=>{
    return num1+num2+uni
}
const result=add(1000,2000,'원') //결과의 return 타입도 예측 가능 

//any 타입
let qqq: any='철수' //자바스크립트와 동일 
qqq=123
qqq=true 