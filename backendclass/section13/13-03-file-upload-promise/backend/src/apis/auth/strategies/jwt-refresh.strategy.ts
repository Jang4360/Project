import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

//import {kakaoStragegy} from "passport-kakao"
//import {googleStragegy} from "passport-google-oauth20"

export class JwtRefreshStrategy extends PassportStrategy(Strategy, "refresh") {
    constructor() {
        super({
            jwtFromRequest: (req) => {
                console.log(req);
                const cookie = req.headers.cookie; //refreshToken=aklwnaknewnl
                const refreshToken = cookie.replace("refreshToken=", "");
                return refreshToken;
            },

            secretOrKey: "나의리프레시비밀번호",
        });
    }
    validate(payload) {
        //검증 성공하면 payload에 등록된 데이터 sub:user.id 리턴
        console.log(payload); // {sub: user.id}
        return {
            id: payload.sub, // req.user에 해당 값 저장
        };
    }
}
