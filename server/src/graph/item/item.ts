import { Db } from "../../data/db";
import { SubGraph } from "../types";

import types from "./types.graphql";
import query from "./query.graphql";
import mutation from "./mutation.graphql";

export const itemGraph = (db: Db): SubGraph => {
  const graph: SubGraph = {
    schema: {
      types,
      query,
      mutation,
    },
    root: {
      getItem: ({ id }) => {
        return db.get(id);
      },
      items: () => {
        return db.all();
      },
      insertItem: ({ id, value }) => {
        return db.insert({ id, value });
      },
    }
  };

  return graph;
}
