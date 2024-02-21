//public, private, protected, readonly

class Monster1{
    //power=10 -> public, private, protected, readonly중 1개라도 있으면 생략가능 

    constructor(public power: any){
        //this.power=power -> public, private, protected, readonly중 1개라도 있으면 생략가능 
    }

    attack1=()=>{
        console.log("공격하자")
        console.log("내 공격력은 "+this.power+"이야")
    }
}

class 공중몬스터1 extends Monster1{
    attack2=()=>{
        console.log("공격하자")
        console.log("내 공격력은 "+this.power+"이야")
    }
}


const monster11 =new 공중몬스터1(20);
monster11.attack1()
monster11.attack2()
console.log(monster11.power)
monster11.power=10
