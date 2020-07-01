import express, { Request, Response } from "express";
import next from "next";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";

// GraphQL folder
import { portFolioTypes } from "./graphql/types";
import { portfolioResolver } from "./graphql/resolvers/notAppoloindex";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Construct a schema, using GRAPHQL schema language
  const schema = buildSchema(`
      ${portFolioTypes}
      type Query {
        hello: String
        portfolio(id: ID): Portfolio
        portfolios: [Portfolio]
      }

      type Mutation {
        createPortfolio(input: PortfolioInput): Portfolio
      }
  `);

  // The root provides a resolver for each API endpoint
  const root = { ...portfolioResolver };

  server.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true
    })
  );

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
