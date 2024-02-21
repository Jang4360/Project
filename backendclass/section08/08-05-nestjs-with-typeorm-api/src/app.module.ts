import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardsModule } from './apis/boards/src/boards.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/boards/entities/board.entity';

@Module({
  imports: [
    BoardsModule,
    //productsModule,
    //UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'jang4360',
      database: 'myproject',
      entities: [Board],
      synchronize: true, // DB에 없는 테이블을 생성함
      logging: true, // 어떤 쿼리가 실행되었는지 보여줌
    }),
  ],
})
export class AppModule {}
