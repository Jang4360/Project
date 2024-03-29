import { Module } from '@nestjs/common';
// import { AppController } from './app.resolver';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'arc/commons/graphql/schema.gql',
    }),
  ],
  providers: [
    AppService, //
    AppResolver,
  ],
})
export class AppModule {}
