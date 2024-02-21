import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardsModule } from './apis/boards/src/boards.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    BoardsModule,
    //productsModule,
    //UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
  ],
})
export class AppModule {}
