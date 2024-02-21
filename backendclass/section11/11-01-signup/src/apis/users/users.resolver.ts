import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";

@Resolver()
export class UsersResolver {
    constructor(
        private usersService: UsersService, //
    ) {}
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
