import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import {
    IAuthServiceGetAccessToken,
    IAuthServiceLogin,
    IAuthServiceRestoreAccessToken,
    IAuthServiceSetRefreshToken,
} from "./interfaces/auth-service.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, //
        private readonly jwtService: JwtService,
    ) {}

    async login({
        email,
        password,
        context,
    }: IAuthServiceLogin): Promise<string> {
        // 1. 이메일이 일치하는 유저를 DB에서 찾기
        const user = await this.usersService.findOneByEmail({ email });

        // 2. 일치하는 유저가 없으면 에러 던지기
        if (!user) throw new UnprocessableEntityException("이메일이 없습니다");
        const isAuth = await bcrypt.compare(password, user.password); //사용자에게 입력받은 비밀번호와 hash 암호화된 DB안의 비밀번호 비교

        // 3. 일치하는 유저가 있지만 비밀번호가 틀렸으면 에러 던지기
        if (!isAuth)
            throw new UnprocessableEntityException("비밀번호가 틀렸습니다.");

        // 4. refreshToken(=JWT)을 만들어서 브라우저 쿠키에 저장해서 보내주기
        this.setRefreshToken({ user, context });

        // 5. 일치하는 유저도 있고, 비밀번호도 맞으면 accessToken(=JWT)만들어서 브라우저에 전달하기
        return this.getAccessToken({ user });
    }

    restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
        return this.getAccessToken({ user });
    }

    setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
        const refreshToken = this.jwtService.sign(
            { sub: user.id },
            { secret: "나의리프레시비밀번호", expiresIn: "2w" },
        );
        //개발환경(header)
        context.res.setHeader(
            "set-Cookie",
            `refreshToken=${refreshToken}; path=/;`,
        );

        //배포환경
        // context.res.setHeader("set-Cookie",`refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`,);
        // context.res.setHeader("Access-control-Allow-Origin","https://myfrontsite.com") //해당 주소에서만 쿠키를 사용할 수 있도록 설정
    }

    getAccessToken({ user }: IAuthServiceGetAccessToken): string {
        return this.jwtService.sign(
            { sub: user.id }, // 받을 정보 정하는 곳
            { secret: "나의비밀번호", expiresIn: "1h" },
        );
    }
}
