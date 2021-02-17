import 'dotenv/config';
import './services/telegram';
import './controllers/telegram';
import { ApolloServer, gql } from 'apollo-server';

const serverPort = 4000;

// graphql definitions
const typeDefs = gql`
  type GrayscaleMessage {
    success: Boolean!
    message: String
  }

  type Query {
    helloWorld: String
  }

  type Mutation {
    grayscale(bought: Float!): GrayscaleMessage
  }
`;

const resolvers = {
  Query: {
    helloWorld: () => "It's live!",
  },
  Mutation: {
    grayscale: () =>
      // bot.sendMessage()
      ({ success: true, message: 'Ok' }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: serverPort }, () => {
  console.log(`Server listening at ${serverPort}`); // eslint-disable-line
});
