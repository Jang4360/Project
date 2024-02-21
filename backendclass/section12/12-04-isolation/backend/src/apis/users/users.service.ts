import { ConflictException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {
    IUsersServiceCreate,
    IUsersServiceFiondOneByEmail,
} from "./interfaces/users-service.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>, //
    ) {}

    //이메일 중복 체크
    findOneByEmail({ email }: IUsersServiceFiondOneByEmail): Promise<User> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async create({
        email,
        password,
        name,
        age,
    }: IUsersServiceCreate): Promise<User> {
        const user = await this.findOneByEmail({ email });
        if (user) throw new ConflictException("이미 존재하는 이메일입니다.");
        //hashService함수 별도로 만들기
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersRepository.save({
            email,
            password: hashedPassword,
            name,
            age,
        });
    }
}
