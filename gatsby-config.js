console.log("env",process.env.NODE_ENV);
var baseUrl;
process.env.NODE_ENV==="development"?baseUrl="http://localhost:8888":"https://virtual-lolly-project12e.netlify.app"

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Lolly",
        fieldName: "lollies",
        url: `${baseUrl}/.netlify/functions/lolly`,
      },
    },
  ],
};


