import { Db } from "../data/db";

export const itemGraph = (db: Db) => {
  const graph = {
    schema: {
      types: `
        type Item {
          id: ID!
          value: String
        }
      `,
      query: `
        getItem(id: ID!): Item
        items: [Item!]
      `,
      mutation: `
        insertItem(id: ID!, value: String!): Item
      `,
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
