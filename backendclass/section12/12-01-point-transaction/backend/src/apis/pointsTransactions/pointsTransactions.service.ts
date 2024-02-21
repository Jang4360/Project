import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
    POINT_TRANSACTION_STATUS_ENUM,
    PointTransaction,
} from "./entities/pointTransaction.entity";
import { IPointsTransactionsServiceCreate } from "./interfaces/points-transactions-service.interface";
import { User } from "../users/entities/user.entity";

@Injectable()
export class PointsTransactionsService {
    constructor(
        @InjectRepository(PointTransaction)
        private readonly pointsTransactionsRepository: Repository<PointTransaction>,

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>, //user의 돈을 찾아오기 위해
    ) {}

    async create({
        impUid,
        amount,
        user: _user, // user를 받아와 _user로 바꿔줌
    }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
        // this.pointsTransactionsRepository.create(); // 등록을 위한 빈 객체 만들기
        // this.pointsTransactionsRepository.insert(); // 결과는 못받는 등록 방법
        // this.pointsTransactionsRepository.update(); // 결과는 못받는 수정 방법
        // this.pointsTransactionsRepository.save(); // 결과를 받는 등록 및 수정 방법 (query가 2번)

        //1. PointTransaction 테이블에 거래기록 1줄 생성
        const pointTransaction = this.pointsTransactionsRepository.create({
            impUid,
            amount,
            user: _user, //_user를 user에 담는다
            status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
        });
        await this.pointsTransactionsRepository.save(pointTransaction);

        //2. 유저의 돈 찾아오기
        const user = await this.usersRepository.findOne({
            where: { id: _user.id },
        });
        user.point;

        //3. 유저의 돈 업데이트
        await this.usersRepository.update(
            { id: _user.id },
            { point: user.point + amount },
        );
        //4. 최종결과 브라우저에 돌려주기
        return pointTransaction;
    }
}
