//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 버튼 누름
//만약 유저가 랜덤 번호 맞추면 맞췄습니다!
//랜덤 번호가< 유저번호 Down!!
//랜덤번호가 > 유저번호 Up!!
//Reset버튼을 누르면 게임이 리셋된다
//5번의 기회를 다 쓰면 게임이 끝난다(더 이상 추측 불가, 버튼이 disable)
//유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
//유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깍지 않는다

let randomNum=0;
let go=document.getElementById('go')
let reset=document.getElementById('reset')
let index=document.getElementById('index')
let input=document.getElementById('input')
let direct=document.getElementById('direct')

function random(){
    randomNum=Math.floor(Math.random()*100+1)
    console.log(`정답${randomNum}`)
}
random()

go.addEventListener('click',play)
reset.addEventListener('click',restart)
input.addEventListener('focus',empty)

let chances=5
let history=[]
let gameOver=false
function play(){
    let value=input.value
    if(history.includes(value)){
        direct.textContent='아까 입력했다 다른거!'
        return
    }
    if(value>100||value<1){
        direct.textContent='1~100 숫자 입력하라 했다.'
        return
    }
    
     chances--
    index.textContent=`남은기회 : ${chances}번`
    history.push(value)
    if(value<randomNum){
        direct.textContent='업!'
    }
    else if(value>randomNum){
        direct.textContent='다운!'
    }
    else if(value==randomNum){
        direct.textContent='넌 통과~ 다음 들어와'
        gameOver=true
        go.disabled=gameOver
    }
    else{
        direct.textContent='1~100 숫자 입력하라 했다.'
        index.textContent=`남은기회 : ${chances+1}번`
        chances=chances+=1
    }
   
    if(chances==0){
        gameOver=true
        go.disabled=gameOver
        direct.textContent='뭣하냐 잔 따라줘라'
    }
}

function restart(){
    direct.textContent=''
    index.textContent='남은기회 : 5번'
    input.value=''
    chances=5
    go.disabled=false
    
}
function empty(){
    input.value=''
}