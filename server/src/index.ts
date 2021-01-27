import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import dotenv from "dotenv";

import { graph as helloGraph } from "./graph/hello";
import { graph as goodbyeGraph } from "./graph/goodbye";

dotenv.config();

const PORT = process.env.PORT ? process.env.PORT : 7000;

const constructGraph = () => {
  const subGraphs = [ helloGraph, goodbyeGraph ];

  let queries = "";
  subGraphs.forEach(sg => {
    queries += `${sg.schema.query}\n\n`;
  });

  const schema = buildSchema(`
    type Query {
      ${queries}
    }
  `);

  const root: any = {};
  subGraphs.forEach(sg => {
    for (const resolver in sg.resolvers) {
      root[resolver] = sg.resolvers[resolver];
    }
  });

  return {
    schema,
    root
  }
};

const run = () => {
  const graph = constructGraph();

  const app = express();

  app.use("/api", graphqlHTTP({
    schema: graph.schema,
    rootValue: graph.root,
    graphiql: true,
  }));

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
}

run();