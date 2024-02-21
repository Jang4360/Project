import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { IContext } from "src/commons/interfaces/context";

@Resolver()
export class UsersResolver {
    constructor(
        private usersService: UsersService, //
    ) {}

    @UseGuards(GqlAuthGuard("access")) //등록된 나만의인가가 실행됨(restAPI 인가방식)
    @Query(() => String)
    fetchUser(
        @Context() context: IContext, //
    ): string {
        //유저정보 꺼내오기
        console.log("================");
        console.log(context.req.user);
        console.log("================");
        return "인가성공";
    }
    @Mutation(() => User)
    createUser(
        @Args("email") email: string,
        @Args("password") password: string,
        @Args("name") name: string,
        @Args({ name: "age", type: () => Int }) age: number, //age가 number로 받으면 소숫점으로 받아옴. 따라서 int type이라는 것을 명시
    ): Promise<User> {
        return this.usersService.create({ email, password, name, age });
    }
}
