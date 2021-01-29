import { buildSchema } from "graphql";

import { helloGraph } from "./hello/hello";
import { goodbyeGraph } from "./goodbye/goodbye";
import { itemGraph } from "./item/item";
import { Db } from "../data/db";
import { SubSchema } from "./types";

const findSection = (schema: string, start: string, end: string) => {
  const startIndex = schema.indexOf(start);
  const endIndex = schema.indexOf(end);

  const section = schema
    .substring(startIndex, endIndex)
    .replace(start, "")
    .replace(end, "");

  return section;
}

const computeSubSchema = (schema: string): SubSchema => {
  const types = findSection(schema, "## Types", "## EndTypes");
  const query = findSection(schema, "## Query", "## EndQuery");
  const mutation = findSection(schema, "## Mutation", "## EndMutation");

  return {
    types,
    query,
    mutation
  };
}

export const constructGraph = (db: Db) => {
  const subGraphs = [ helloGraph(db), goodbyeGraph(db), itemGraph(db) ];

  let types = "";
  let queries = "";
  let mutations = "";

  subGraphs.forEach(sg => {
    const schema = computeSubSchema(sg.schema);

    if (schema.types) {
      types += `${schema.types}\n\n`;
    }
    if (schema.query) {
      queries += `${schema.query}\n\n`;
    }
    if (schema.mutation) {
      mutations += `${schema.mutation}\n\n`;
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