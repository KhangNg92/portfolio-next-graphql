import express from "express";
import next from "next";
import mongoose from "mongoose";

import { ApolloServer, gql } from "apollo-server-express";

// GraphQL folder
import { portFolioTypes, userTypes } from "./graphql/types";
import {
  portfolioQueries,
  portfolioMutations,
  userMutations,
  userQueries
} from "./graphql/resolvers";
import { DB } from "./config/dev";
import { buildAuthContext } from "./graphql/context";
import { User } from "./graphql/models/User";
// import { Portfolio, PortfoModel } from "./graphql/models/Portfolio";
import { init } from "./middlewares";
import { UserModel } from "./models/User";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  () => {
    console.log("Connected to DB");
  }
);

app.prepare().then(() => {
  const server = express();

  init(server);

  // Construct a schema, using GRAPHQL schema language
  const typeDefs = gql`
    ${portFolioTypes}
    ${userTypes}
    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
      userPortfolios: [Portfolio]
      user: User
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signout: Boolean
    }
  `;

  // The root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations
    }
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        ...buildAuthContext(req),
        models: {
          User: new User(UserModel)
        },
        req
      };
    }
  });
  apolloServer.applyMiddleware({ app: server });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
