const classmates=['철수','영희','훈이','짱구','유리']
const[first,second,third,,fifth]=classmates
// console.log(first,second,third,fifth)
function profile({name,students}){
    console.log(name,students)
}
const c={
    name:'1반', 
    teacher:'김선생님',
    students:['철수','영희','훈이','짱구','유리']}
const{name,teacher}=c
profile(c)
// console.log(name,teacher)
