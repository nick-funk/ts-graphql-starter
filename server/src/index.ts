import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import dotenv from "dotenv";

import { helloGraph } from "./graph/hello";
import { goodbyeGraph } from "./graph/goodbye";
import { itemGraph } from "./graph/item";
import { Db } from "./data/db";

dotenv.config();

const PORT = process.env.PORT ? process.env.PORT : 7000;

const constructGraph = () => {
  const db = new Db();
  const subGraphs = [ helloGraph(db), goodbyeGraph(db), itemGraph(db) ];

  let types = "";
  let queries = "";
  let mutations = "";

  subGraphs.forEach(sg => {
    if (sg.schema.types !== "") {
      types += `${sg.schema.types}\n\n`;
    }
    if (sg.schema.query !== "") {
      queries += `${sg.schema.query}\n\n`;
    }
    if (sg.schema.mutation !== "") {
      mutations += `${sg.schema.mutation}\n\n`;
    }
  });

  const rawSchema = `
    ${types}

    type Query {
      ${queries}
    }

    type Mutation {
      ${mutations}
    }
  `;
  const schema = buildSchema(rawSchema);

  const root: any = {};
  subGraphs.forEach(sg => {
    for (const item in sg.root) {
      root[item] = sg.root[item];
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