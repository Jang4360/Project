import axios from "axios";

// const result= axios.get('https://koreanjson.com/posts/1')
// console.log(result) //promise{<pending>}

const fetchSync = async() => {
  //함수 중복선언 문제를 해결하고자 화살표 함수로 변경
  const result = await axios.get("https://koreanjson.com/posts/1");
  //console.log(result); //제대로된 결과
  console.log(result.data);
};

fetchSync();
