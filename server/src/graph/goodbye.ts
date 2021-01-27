import { Db } from "../data/db";

export const goodbyeGraph = (db: Db) => {
  const graph = {
    schema: {
      types: ``,
      query: `
        goodbye(lang: String): String
      `,
      mutation: ``,
    },
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
