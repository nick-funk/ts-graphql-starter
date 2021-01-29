import { Db } from "../../data/db";
import { SubGraph } from "../types";

import schema from "./schema.graphql";

export const helloGraph = (db: Db): SubGraph => {
  const graph: SubGraph = {
    schema,
    root: {
      hello: ({ lang }) => {
        switch (lang) {
          case "ru":
            return "Здравствуйте";
          case "fr":
            return "Bonjour"
          default:
            return "Hello";
        }
      },
    }
  };

  return graph;
}
