// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import Cors from 'micro-cors';
import { cookieMiddleware } from '../../middleware/cookieMiddleware';


import typeDefs from '../../db/schema'
import resolvers from '../../db/resolvers'
import connectDb from '../../db/config'

const cors = Cors();


// clientPromise
connectDb()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ req, res }) => ({ req, res , cookieMiddleware}),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})]
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  }
}

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  console.log('req cors', req)
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  await apolloServer.getMiddleware({
    path: '/api/graphql'
  })(req, res)
});