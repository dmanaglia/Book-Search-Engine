const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    # mongoose Id
    _id: ID
    authors: [String]!
    description: String
    # Google Id
    bookId: ID
    image: String
    link: String
    title: String
  }

  # Set up an Auth type to handle returning data from a profile creating or user login
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    findUser: User
  }

  type Mutation {
    # Set up mutations to handle creating a profile or logging into a profile and return Auth type
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: ID!, authors: [String]!, title: String!, description: String!, image: String!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
