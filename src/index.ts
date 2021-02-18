import 'dotenv/config';
import './controllers/telegram';
import { ApolloServer, gql } from 'apollo-server';
import bot from './services/telegram';

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
    grayscalePurchase(bought: Float!): GrayscaleMessage
  }
`;

const resolvers = {
  Query: {
    helloWorld: () => "It's live!",
  },
  Mutation: {
    grayscalePurchase: () =>
      // bot.sendMessage()
      ({ success: true, message: 'Ok' }),
  },
};

bot.launch();
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: serverPort }, () => {
  console.log(`Server listening at ${serverPort}`); // eslint-disable-line
});
