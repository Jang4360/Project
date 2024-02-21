//public, private, protected, readonly

class Monster5{
    //power=10 -> public, private, protected, readonly중 1개라도 있으면 생략가능 

    constructor(private readonly power: any){
        //this.power=power -> public, private, protected, readonly중 1개라도 있으면 생략가능 
    }

    attack1=()=>{
        console.log("공격하자")
        console.log("내 공격력은 "+this.power+"이야") //안에서 접근 가능
        this.power=30 //안에서 수정 불가
    }
}

class 공중몬스터5 extends Monster5{
    attack2=()=>{
        console.log("공격하자")
        console.log("내 공격력은 "+this.power+"이야") //자식에서 접근 불가
        this.power=30 //자식에서 수정 불가
    }
}


const monster55 =new 공중몬스터5(20);
monster55.attack1()
monster55.attack2()
console.log(monster55.power) //밖에서 접근 불가
monster55.power=10 //밖에서 수정 불가
