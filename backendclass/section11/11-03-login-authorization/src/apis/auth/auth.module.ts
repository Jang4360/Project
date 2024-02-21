import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";

@Module({
    // imports: [
    //     TypeOrmModule.forFeature([ //forRoot에 대한 상세 정보를 변경하려 할 때 forFeature사용
    //         User, //
    //     ]),
    // ],
    imports: [
        UsersModule, //
        JwtModule.register({}), //원본 함수에 변경된 모듈을 등록할 때
    ],
    providers: [
        JwtAccessStrategy, //
        AuthResolver,
        AuthService,
    ],
})
export class AuthModule {}
