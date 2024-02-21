import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { IContext } from "src/commons/interfaces/context";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "./guards/gql-auth.guard";

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService, //
    ) {}
    @Mutation(() => String)
    login(
        @Args("email") email: string, //
        @Args("password") password: string,
        @Context() context: IContext,
    ): Promise<string> {
        return this.authService.login({ email, password, context });
    }
    // 1. refreshToken 인가
    @UseGuards(GqlAuthGuard("refresh")) //등록된 나만의인가가 실행됨(restAPI 인가방식)
    //refreshToken 인가하는 guard
    @Mutation(() => String)
    restoreAccessToken(@Context() context: IContext): string {
        return this.authService.restoreAccessToken({ user: context.req.user });
    }
    // 2. accessToken 재발급
}
