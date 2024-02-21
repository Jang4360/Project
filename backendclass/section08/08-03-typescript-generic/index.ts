//1. 문자 / 숫자/ 불린 기본타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};
const result1 = getPrimitive("hello", 123, true);
//
//
//2. any 타입 (자바스크립트랑 같음)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); // any는 아무거나 다 됨
  return [arg3, arg2, arg1];
};
const result2 = getAny("hello", 123, true);
//
//
//3. unknown타입
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 + 100);
  return [arg3, arg2, arg1];
};
const result3 = getPrimitive("hello", 123, true);
//
//
//4. generic타입 -> 사용자 보다 제공자 입장에서 주로 사용함 (사용자에 따라 값을 어떤것을 입력할지 모르기에)
const getGeneric = <MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] => {
  return [arg3, arg2, arg1];
};
const result4 = getGeneric<string, number, boolean>("hello", 123, true); //return type 예측 가능
//
//
//4. generic타입 - 2
const getGeneric2 = <T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] => {
  return [arg3, arg2, arg1];
};
const result42 = getGeneric("hello", 123, true);
//
//
//4. generic타입 - 3
const getGeneric3 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};
const result43 = getGeneric("hello", 123, true);
