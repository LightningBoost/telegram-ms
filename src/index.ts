import 'dotenv/config';
import './controllers/telegram';
import { ApolloServer, gql } from 'apollo-server';
import bot from './services/telegram';
import { sendDailyUpdate } from './controllers/grayscale';
import { Resolvers } from './generated/telegram/graphql';

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
    grayscalePurchase(
      bought: Float!
      fiat: Float!
      total: Float!
      change: Float!
    ): GrayscaleMessage
  }
`;

const resolvers: Resolvers = {
  Query: {
    helloWorld: () => "It's live!",
  },
  Mutation: {
    grayscalePurchase: async (parent, { bought, total, fiat, change }) => {
      await sendDailyUpdate({ fiat, bought, total, change });
      return { success: true, message: 'Updates sent' };
    },
  },
};

bot.launch();
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: serverPort }, () => {
  console.log(`Server listening at ${serverPort}`); // eslint-disable-line
});
