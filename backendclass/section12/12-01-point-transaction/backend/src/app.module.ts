import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { BoardsModule } from "./apis/boards/src/boards.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
//import { Board } from './apis/boards/entities/board.entity';
import { ConfigModule } from "@nestjs/config";
import { ProductsModule } from "./apis/porducts/products.modules";
import { UsersModule } from "./apis/users/users.module";
import { AuthModule } from "./apis/auth/auth.module";
import { PointsTransactionsModule } from "./apis/pointsTransactions/pointsTransactions.module";
@Module({
    imports: [
        PointsTransactionsModule,
        AuthModule,
        BoardsModule,
        ProductsModule,
        UsersModule,
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: "src/commons/graphql/schema.gql", //해당 위치에 typeDefs자동으로 생성

            //req, res를 context로 넘겨줌 기본적으로 req는 들어오지만  res는 작성해줘야함
            context: ({ req, res }) => ({ req, res }),
        }),
        TypeOrmModule.forRoot({
            // forRoot -> 설정을 전영역에 적용할 때
            type: process.env.DATABASE_TYPE as "mysql",
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [__dirname + "/apis/**/*.entity.*"],
            synchronize: true, // DB에 없는 테이블을 생성함
            logging: true, // 어떤 쿼리가 실행되었는지 보여줌
        }),
    ],
})
export class AppModule {}
