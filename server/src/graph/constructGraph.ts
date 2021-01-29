import { buildSchema } from "graphql";

import { helloGraph } from "./hello/hello";
import { goodbyeGraph } from "./goodbye/goodbye";
import { itemGraph } from "./item/item";
import { Db } from "../data/db";

export const constructGraph = (db: Db) => {
  const subGraphs = [ helloGraph(db), goodbyeGraph(db), itemGraph(db) ];

  let types = "";
  let queries = "";
  let mutations = "";

  subGraphs.forEach(sg => {
    if (sg.schema.types) {
      types += `${sg.schema.types}\n\n`;
    }
    if (sg.schema.query) {
      queries += `${sg.schema.query}\n\n`;
    }
    if (sg.schema.mutation) {
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