import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardsModule } from './apis/boards/src/boards.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { Board } from './apis/boards/entities/board.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [
        BoardsModule,
        //productsModule,
        //UsersModule,
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
        }),
        TypeOrmModule.forRoot({
            type: process.env.DATABASE_TYPE as 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [__dirname + '/apis/**/*.entity.*'],
            synchronize: true, // DB에 없는 테이블을 생성함
            logging: true, // 어떤 쿼리가 실행되었는지 보여줌
        }),
    ],
})
export class AppModule {}
