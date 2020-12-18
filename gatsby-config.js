module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Lolly",
        fieldName: "lollies",
        url: "/.netlify/functions/lolly",
      },
    },
  ],
};


