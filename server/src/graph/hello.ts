export const graph = {
  schema: {
    query: `
      hello(lang: String): String
    `
  },
  resolvers: {
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