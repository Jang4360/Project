import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export const GqlAuthGuard = (name) => {
    return class GqlAuthGuard extends AuthGuard(name) {
        //graphql용 context를 사용하기 위해 AuthGuard를 상속받아서 사용
        getRequest(context: ExecutionContext) {
            const gqlContext = GqlExecutionContext.create(context);
            return gqlContext.getContext().req;
        }
    };
};
