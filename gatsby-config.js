module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Lolly",
        fieldName: "lollies",
        url: "https://virtual-lolly-project12e.netlify.app/.netlify/functions/lolly",
      },
    },
  ],
};


