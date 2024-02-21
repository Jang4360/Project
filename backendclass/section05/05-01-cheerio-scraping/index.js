import axios from 'axios'
import cheerio from 'cheeerio'

const createMessage = async(data)=>{

    //1. 입력된 메시지에서http로 시작하는 문장 찾기 (.find()등의 알고리즘 사용)
    const url= data.contents 
        .split(" ")
        .filter((el)=>el.includes("http"))[0]

    //2. axios.get으로 요청해서 html코드 받아오기 
    const result= await axios.get(url)
    console.log(result.data)

    //3. 스크래핑 결과에서 OG(오픈그래프) 코드를 골라내서 변수에 담기 -> cheerio 도움받기
    const $= cheerio.load(result.data)
    $('meta').each((index,el)=>{
        if($(el).attr("property")&&$(el).attr("property").includes('og:')){
            const key= $(el).attr("property").split(":")[1]
            const value= $(el).attr("content")
            console.log(key,value) 
        }
    }) 
}
const data={
    title:'안녕하세요',
    contents:'여기 한번 놀러오세요 http://www.naver.com'
}
createMessage(data)
