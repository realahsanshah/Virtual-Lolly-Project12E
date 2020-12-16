const { ApolloServer, gql } = require("apollo-server-lambda");

const faunadb=require('faunadb'),
  query=faunadb.query;
const shortId=require('shortid')

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Lolly {
    recipient: String
    message: String
    sender:String
    top:String
    middle:String
    bottom:String
    lollyPath:String
  }
  type Mutation{
    createLolly(recipient: String!,message: String!,sender:String!,top:String!,middle:String!,bottom:String!):Lolly
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello, world!";
    },
  },
  Mutation:{
    createLolly:async (_,args)=>{
      const client=new faunadb.Client({secret:process.env.FAUNADB_SERVER_SECRET})
      const id=shortId.generate();
      args.lollyPath=id;
      console.log("Lolly",args)
      const result=await client.query(
        query.Create(query.Collection("lolly"),{
          data:args
        })
      )
      
      console.log("result",result.data);

      return result.data
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground:true,
  introspection:true
});

const handler = server.createHandler();

module.exports = { handler };
