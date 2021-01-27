import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? process.env.PORT : 7000;

const schema = buildSchema(
  `
  type Query {
    hello(lang: String): String
  }
  `
);

const root = {
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
};

const app = express();

app.use("/api", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});