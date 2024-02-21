import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const resolvers = {
  Query: {
    qqq: () => {
      return "abcdefg";
    },
  },
};
const typeDefs = `#graphql
    type Query{
        qqq: String
    }
`;

const server = new ApolloServer({
  typeDefs, // swagger
  resolvers, // api
});
startStandaloneServer(server); //4000
