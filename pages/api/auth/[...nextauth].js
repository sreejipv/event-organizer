import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from 'mongodb'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"
import connectDb from "../../../db/config"


export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },

      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  pages: {
    // signIn: '/api/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  jwt: {
    encryption: true,
  },

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {

      if (session?.user) {
        session.user.id = token.sub;
      }
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  database: process.env.MONGODB_URI,
  secret: "secret",
  session:{
    strategy: "jwt"
  }

});