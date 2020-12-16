module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Lolly",
        fieldName: "lollies",
        url: "http://localhost:8888/.netlify/functions/lolly",
      },
    },
  ],
};


