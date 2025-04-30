export const typeDefs = `#graphql
 type Post{
    id: ID!
    title: String!
    content: String!
    author: User!
    published: Boolean!
    createdAt: String!
 }

 type User{
    id: ID!
    name: String!
    email: String!
    posts: [Post]
    createdAt: String!
 }

 type Profile{
    id: ID!
    bio: String!
    createdAt: String!
    user: User!
 }

 type UserArgs{
      token: String
      data: User
 }


 type Query{
    posts: [Post!]!
    users: [User!]!
    user(id: String!): User!
    profiles: [Profile!]!

 }

 type Mutation{
   signup(name: String!, email: String!, password: String!): UserArgs!
 }
`;
