const { ApolloServer, gql } = require("apollo-server-lambda");

const faunadb=require('faunadb'),
  query=faunadb.query;

const typeDefs = gql`
  type Query {
    lollies:[Lolly]
    lollyByPath(lollyPath:String):Lolly
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
    createLolly(recipient: String,message: String,sender:String,top:String,middle:String,bottom:String,lollyPath:String):Lolly
  }
`;

const client=new faunadb.Client({secret:process.env.FAUNADB_SERVER_SECRET})

const resolvers = {
  Query: {
    lollies: async()=>{
      var result = await client.query(
        query.Map(
          query.Paginate(query.Documents(query.Collection("lolly"))),
          query.Lambda(x => query.Get(x))
        )
      )
      const lollies=result.data.map(lolly=>lolly.data);
      console.log("result",lollies);
      // return "result"
      return lollies;
    },
    lollyByPath:async(_,{lollyPath})=>{
      const result=await client.query(
            query.Get(query.Match(query.Index("lolly_by_path"),lollyPath))
          )
          return result.data;
    }
  },
  Mutation:{
    createLolly:async (_,args)=>{
      
      console.log("Lolly",args)
      const result=await client.query(
        query.Create(query.Collection("lolly"),{
          data:args
        })
      )
      
      console.log("result",result.data);

      return result.data
      // return args;
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
