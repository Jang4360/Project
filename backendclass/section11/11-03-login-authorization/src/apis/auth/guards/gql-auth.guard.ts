import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export class GqlAuthAccessGuard extends AuthGuard("access") {
    //graphql용 context를 사용하기 위해 AuthGuard를 상속받아서 사용 // getRequest 메서드를 graphql 용도로 오버라이딩해서 사용
    getRequest(context: ExecutionContext) {
        const gqlContext = GqlExecutionContext.create(context);
        return gqlContext.getContext().req;
    }
}
