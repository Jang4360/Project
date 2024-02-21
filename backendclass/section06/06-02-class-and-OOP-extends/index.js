

const date=new Date();
console.log(date.getFullYear())
console.log(date.getMonth()+1)

class Monster{
    power=10
    protect=5
    constructor(a,d){
        this.power=a
        this.protect=d
    }
    attack=()=>{
        console.log("공격하자")
        console.log("내 공격력은 "+this.power+"이야")
    }
    run=()=>{
        console.log("도망가자")
    }
    defend=()=>{
        console.log("방어하자")
        console.log("내 방어력은 "+this.protect+"이야")
    }
}

class 공중몬스터 extends Monster{
    constructor(a,d){
        super(a+1,d) //부모 객체에 전달 
    }
    run=()=>{
        console.log("날라서 도망가자")
    }
}
class 지상몬스터 extends Monster{
    constructor(a,d){
        super(a-2,d)
    }
    //오버라이딩(부모의 run을 덮어쓰기)
    run=()=>{
        console.log("뛰어서 도망가자")
    }
}

const monster1 =new 공중몬스터(20,10);
monster1.attack()
monster1.run()
monster1.defend()

const monster2 =new 지상몬스터(50,10);
monster2.attack()
monster2.run()
monster2.defend()