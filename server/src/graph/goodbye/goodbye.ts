import { Db } from "../../data/db";
import { SubGraph, SubSchema } from "../types";

import query from "./query.graphql";

export const goodbyeGraph = (db: Db): SubGraph => {
  const schema: SubSchema = {
    query: query,
  };

  const graph: SubGraph = {
    schema,
    root: {
      goodbye: ({ lang }) => {
        switch (lang) {
          case "ru":
            return "Прощай";
          case "fr":
            return "Au revoir"
          default:
            return "Goodbye";
        }
      },
    }
  };

  return graph;
}
