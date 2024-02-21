import { Injectable } from "@nestjs/common";
import { Board } from "../entities/board.entity";
import { IBoardsServiceCreate } from "../interfaces/boards-service.interface";

@Injectable()
export class BoardsService {
    findAll(): Board[] {
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
    }
    create({ createBoardInput }: IBoardsServiceCreate): string {
        //1.브라우저에서 보내준 데이터 확인하기
        console.log(createBoardInput.writer);
        console.log(createBoardInput.title);
        console.log(createBoardInput.contents);
        //2.DB에 데이터 저장하기

        //3.DB에 저장된 결과를 브라우저에 응답 주기
        return "게시물 등록 성공";
    }
}
