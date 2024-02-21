const profile = {
    name: '철수',
    age: 8,
    school: '다람쥐초등학교',
    class:{
        grade:1,
        count:30
    }
  };
const profile2 = profile;
const profile3={...profile}//얕은 복사
const profile4=JSON.parse(JSON.stringify(profile))//깊은 복사
profile2.name = '영희';
profile2.class.grade=3
console.log(profile); // { name: '철수', age: 8, school: '다람쥐초등학교' };
console.log(profile3)
console.log(profile4)
