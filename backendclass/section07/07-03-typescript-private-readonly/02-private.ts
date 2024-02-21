//public, private, protected, readonly

class Monster2{
    //power=10 -> public, private, protected, readonly중 1개라도 있으면 생략가능 

    constructor(private power: any){
        //this.power=power -> public, private, protected, readonly중 1개라도 있으면 생략가능 
    }

    attack1=()=>{
        console.log("공격하자")
        console.log("내 공격력은 "+this.power+"이야") //안에서 접근 가능 
        this.power=30 //안에서 수정 가능 
    }
}

class 공중몬스터2 extends Monster2{
    attack2=()=>{
        console.log("공격하자")
        console.log("내 공격력은 "+this.power+"이야") //자식 접근 불가
        this.power=30 //자식 수정 불가 
    }
}


const monster22 =new 공중몬스터2(20);
monster22.attack1()
monster22.attack2()
console.log(monster22.power) //밖에서 접근 불가
monster22.power=10 //밖에서 수정 불가 
