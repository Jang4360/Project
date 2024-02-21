//public, private, protected, readonly

class Monster4{
    //power=10 -> public, private, protected, readonly중 1개라도 있으면 생략가능 

    constructor(readonly power: any){
        //this.power=power -> public, private, protected, readonly중 1개라도 있으면 생략가능 
    }

    attack1=()=>{
        console.log("공격하자")
        console.log("내 공격력은 "+this.power+"이야") //안에서 접근 가능
        this.power=30 //안에서 수정 불가

    }
}

class 공중몬스터4 extends Monster4{
    attack2=()=>{
        console.log("공격하자")
        console.log("내 공격력은 "+this.power+"이야") //자식 접근 가능
        this.power=30 //자식 수정 불가
    }
}


const monster44 =new 공중몬스터4(20);
monster44.attack1()
monster44.attack2()
console.log(monster44.power) //밖에서 접근 가능
monster44.power=10 //밖에서 수정 불가

