const { gql } = require('apollo-server-micro');
const { GraphQLDate, GraphQLTime, GraphQLDateTime } = require('graphql-scalars');

const typeDefs = gql`
scalar Date
scalar Number

  type User {
    id: ID
    name: String
    email: String
    posts: [Post]
  }


  type Post {
    id: ID
    title: String
    content: String
    user: User
  }

  type AuthResponse {
    user: User
    token: String
  }

  type Event {
    id: ID
    name: String
    description: String
    date: String
    count: Number
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
    userId: ID!
  }
  input CreateEventInput {
    name: String!
    description: String!
    date: Date!
    count: Number!
    userId: ID!
  }

  input loginInput {
    email: String!,
    password: String!
  }

  type Query {
    users: [User]
    posts: [Post]
    user(id: ID!): User
    post(id: ID!): Post
    event(id: ID!): Event
    getUser: User
  }


  type Mutation {
    createUser(input: CreateUserInput!): User
    createEvent(input: CreateEventInput!): Event
    createPost(input: CreatePostInput!): Post
    login(input: loginInput): AuthResponse

  }
`;

module.exports = typeDefs;
