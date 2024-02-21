import { Module } from "@nestjs/common";

import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            //DB의 Repository를 가져오기 위해
            User,
        ]),
    ],
    providers: [UsersResolver, UsersService],
    exports: [
        UsersService, // UsersModule에 UsersService가 담겨서 나감
    ],
})
export class UsersModule {}
