import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

//import {kakaoStragegy} from "passport-kakao"
//import {googleStragegy} from "passport-google-oauth20"

export class JwtAccessStrategy extends PassportStrategy(Strategy, "access") {
    constructor() {
        super({
            //부모의 constructor PassportStrategy에게 전달. PassportStrategy에서 1.비밀번호검증 2.만료시간검증
            // jwtFromRequest: (req) => {
            //     const temp = req.headers.Authorization; //토큰 값: Bearer aepwaofwqlak
            //     const accessToken = temp.toLowercase().replace("bearer ", "");
            //     return accessToken;
            // },
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //header의 authorization으로부터 토큰 추출
            secretOrKey: "나의비밀번호",
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
