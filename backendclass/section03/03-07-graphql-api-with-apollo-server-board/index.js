import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const resolvers = {
  Query: {
    fetchBoards: (_, args, context, info) => {
      const result = [
        {
          number: 1,
          writer: "철수",
          title: "제목입니다",
          contents: "내용입니다",
        },
        {
          number: 2,
          writer: "영희",
          title: "영희입니다",
          contents: "내용입니다",
        },
        {
          number: 3,
          writer: "민지",
          title: "민지입니다",
          contents: "내용입니다",
        },
      ];
      return result;
    },
  },
  Mutation: {
    createBoard: (_, args) => {
      //1.브라우저에서 보내준 데이터 확인하기
      console.log(args.createBoardInput.writer);
      console.log(args.createBoardInput.title);
      console.log(args.createBoardInput.contents);
      console.log(args.createBoardInput.number);
      //2.DB에 데이터 저장하기

      //3.DB에 저장된 결과를 브라우저에 응답 주기
      return "게시물 등록 성공";
    },
  },
};
const typeDefs = `#graphql
    input createBoardInput{
      writer:String
      title:String
      contents:String
      number:Int
    }

    type MyResult{
      number:Int
      writer:String
      title:String
      contents:String
    }

    type Query{
        fetchBoards: [MyResult]
    }

    type Mutation{
      createBoard(createBoardInput:createBoardInput): String
    }
`;

const server = new ApolloServer({
  typeDefs, // swagger
  resolvers, // api
  //cors: true, // 모든사이트 허용하고 싶을때
  //cors: {origin: ["https://naver.com", "https://google.com"]}, // 특정 사이트만 허용하고 싶을때
});
startStandaloneServer(server); //4000
