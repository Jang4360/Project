//public, private, protected, readonly

class Monster3{
    //power=10 -> public, private, protected, readonly중 1개라도 있으면 생략가능 

    constructor(protected power: any){
        //this.power=power -> public, private, protected, readonly중 1개라도 있으면 생략가능 
    }

    attack1=()=>{
        console.log("공격하자")
        console.log("내 공격력은 "+this.power+"이야") //안에서 접근 가능
        this.power=30 //안에서 수정 가능 

    }
}

class 공중몬스터3 extends Monster3{
    attack2=()=>{
        console.log("공격하자")
        console.log("내 공격력은 "+this.power+"이야") //자식에서 접근 가능
        this.power=30 //자식 수정 가능

    }
}


const monster33 =new 공중몬스터3(20);
monster33.attack1()
monster33.attack2()
console.log(monster33.power) //밖에서 접근 불가
monster33.power=10 //밖에서 수정 불가
