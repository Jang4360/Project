interface IProfile {
  name: string;
  school: string;
  age: number;
  hobby?: string;
}

interface IProfile {
  name: string;
  school: string;
  age: number;
  hobby?: string;
}

// 1. partial type (모두 ?로 바꿔줌)
type aaa = Partial<IProfile>;

// 2. required type (모두 필수로 바꿔줌)
type bbb = Required<IProfile>;

// 3. Pick type (원하는 타입만 뽑아옴)
type ccc = Pick<IProfile, "name" | "age">;

//4. Omit type (원하는 타입만 제외)
type ddd = Omit<IProfile, "school">;

//5. Record type (key,value를 지정해줌)
type eee = "철수" | "영희" | "훈이"; // union type
let childe1: eee = "철수"; // 철수,영희,훈이만 가능
let childe2: string = "바나나";

type fff = Record<eee, number>; // record type

// 6. 객체의 key들로 union type을 만들기
type ggg = keyof IProfile;
let myProfile: ggg = "hobby"; // name, school, age, hobby만 가능

//7. type vs Interface 차이 => 인터페이티스는 선언병합 가능
interface IProfile {
  candy: string;
}
let profile: Partial<IProfile> = {
  candy: "123",
};
