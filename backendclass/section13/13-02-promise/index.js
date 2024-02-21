const fetchData = async () => {
  //axios이다
  const result = await new Promise((성공함수, 실패함수) => {
    setTimeout(() => {
      try {
        console.log("Done!"); //5초후에 이미지 받아옴
        성공함수("강아지.jpg");
      } catch (error) {
        실패함수(error);
      }
    }, 5000);
  });
  console.log(result);
  console.log("받아온 강아지.jpg 브라우저 전달");
};
fetchData();
