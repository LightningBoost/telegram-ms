import dotenv from 'dotenv';
import { ApolloServer, gql } from 'apollo-server';

dotenv.config();

const serverPort = 4000;

// graphql definitions
const typeDefs = gql`
  type GrayscaleMessage {
    bought: Float!
  }

  type Query {
    helloWorld: String
  }

  type Mutation {
    grayscale: String
  }
`;

const resolvers = {
  Query: {
    helloWorld: () => "It's live!",
  },
  Mutation: {
    grayscale: () => 'first',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: serverPort }, () => {
  console.log(`Server listening at ${serverPort}`); // eslint-disable-line
});
