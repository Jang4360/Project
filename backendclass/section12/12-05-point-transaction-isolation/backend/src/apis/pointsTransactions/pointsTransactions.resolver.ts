import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { PointTransaction } from "./entities/pointTransaction.entity";
import { PointsTransactionsService } from "./pointsTransactions.service";
import { IContext } from "src/commons/interfaces/context";

@Resolver()
export class PointsTransactionsResolver {
    constructor(
        private readonly pointsTransactionsService: PointsTransactionsService,
    ) {}

    @UseGuards(GqlAuthGuard("access"))
    @Mutation(() => PointTransaction)
    createPointTransaction(
        @Args("impUid") impUid: string, // impuid, amount, user정보를 받아와 db에 저장
        @Args({ name: "amount", type: () => Int }) amount: number, // 소수점이 아닌 정수로 받아옴
        @Context() context: IContext,
    ): Promise<PointTransaction> {
        const user = context.req.user;
        return this.pointsTransactionsService.create({ impUid, amount, user });
    }
}
