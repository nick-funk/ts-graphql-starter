import { Db } from "../data/db";

export const helloGraph = (db: Db) => {
  const graph = {
    schema: {
      types: ``,
      query: `
        hello(lang: String): String
      `,
      mutation: ``,
    },
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
