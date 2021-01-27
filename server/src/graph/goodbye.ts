export const graph = {
  schema: {
    query: `
      goodbye(lang: String): String
    `
  },
  resolvers: {
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