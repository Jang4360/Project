import { Test } from "@nestjs/testing";
// import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "../users.service";
import { ConflictException } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";

// 나만의 DB만들기
class MockUsersRepository {
    mydb = [
        { email: "a@a.com", password: "1234", name: "kim", age: 13 },
        { email: "qqq@qqq.com", password: "1234", name: "sue", age: 12 },
    ];
    findOne({ where }) {
        const users = this.mydb.filter((el) => el.email === where.email);
        if (users.length) return users[0];
        return null;
    }
    save({ email, password, name, age }) {
        this.mydb.push({ email, password, name, age });
        return { email, password, name, age };
    }
}

describe("UsersService", () => {
    let usersService: UsersService;

    beforeEach(async () => {
        const usersModule = await Test.createTestingModule({
            // imports: [TypeOrmModule...],
            // controllers:[],
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: MockUsersRepository,
                },
            ],
        }).compile();
        usersService = usersModule.get<UsersService>(UsersService);
    });

    // describe("findOneByEmail", () => {
    //     const result = usersService.findOneByEmail({ email: "a@a.com" });
    //     expect(result).toStrictEqual({ // 실제 데이터베이스에 접근하지 않고 테스트하기 위해 주석처리
    //         email:"a@a.com"
    //     })
    // });
    describe("create", () => {
        it("이미 존재하는 이메일 검증", async () => {
            const myData = {
                email: "a@a.com",
                password: "1234",
                name: "kim",
                age: 13,
            };

            try {
                await usersService.create({ ...myData });
            } catch (error) {
                expect(error).toBeInstanceOf(ConflictException); // 에러가 발생하는지 검증하는 테스트 코드
                // expect(error).toBeInstanceOf(UnprocessableEntityException); // 잘 작동하는지 확인
            }
        });
        it("회원 등록 잘 됐는지 검증", async () => {
            const myData = {
                email: "bbb@bbb.com",
                password: "1234",
                name: "kim",
                age: 13,
            };

            const result = await usersService.create({ ...myData });
            const { password, ...rest } = result;
            expect(rest).toStrictEqual({
                email: "bbb@bbb.com",
                name: "kim",
                age: 13,
            });
        });
    });
});
