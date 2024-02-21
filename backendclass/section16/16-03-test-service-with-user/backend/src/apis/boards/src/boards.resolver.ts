import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BoardsService } from "./boards.service";
// import { Board } from "../entities/board.entity";
import { CreateBoardInput } from "../dto/create-board.input";
import { Cache } from "cache-manager";
import { CACHE_MANAGER, Inject } from "@nestjs/common";
@Resolver()
export class BoardsResolver {
    constructor(
        private readonly boardService: BoardsService, //
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {}
    @Query(() => String, { nullable: true })
    async fetchBoards(): Promise<string> {
        // 1. 캐시에서 조회하는 연습
        const mycache = await this.cacheManager.get("qqq");
        console.log(mycache);

        // 2. 조회결과 전달
        return "캐시에서 조회완료";
        // redis연습을 위해 잠시 주석처리
        // return this.boardService.findAll();
    }
    @Mutation(() => String)
    async createBoard(
        // @Args('writer') writer: string,
        // @Args('title') title: string,
        // @Args({ name: 'contents', nullable: true }) contents: string,
        @Args("CreateBoardInput") createBoardInput: CreateBoardInput,
    ): Promise<string> {
        // 1. 캐시에 등록하는 연습
        await this.cacheManager.set("qqq", createBoardInput, { ttl: 5000 });

        // 2. 등록완료 메시지 전달
        return "등록완료";

        // redis연습을 위해 잠시 주석처리
        // return this.boardService.create({ createBoardInput });
    }
}
