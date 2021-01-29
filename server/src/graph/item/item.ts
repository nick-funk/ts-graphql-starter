import { Db } from "../../data/db";
import { SubGraph } from "../types";

import schema from "./schema.graphql";

export const itemGraph = (db: Db): SubGraph => {
  const graph: SubGraph = {
    schema,
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
