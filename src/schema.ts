export const typeDefs = `#graphql
 type Post{
    id: ID!
    title: String!
    content: String!
    author: User
    published: Boolean!
    createdAt: String!
 }

 type User{
    id: ID!
    name: String!
    email: String!
    posts: [Post]
    profile: Profile
    createdAt: String!
 }

 type Profile{
    id: ID!
    bio: String!
    createdAt: String!
    user: User
 } 



 type Query{
    posts: [Post!]!
    users: [User!]!
    me: User
    profiles: [Profile!]
    profile(id: String!): Profile!
 }

 type AuthPayload{
   userError: String
      token: String
 }


 type PostPayload{
   userError: String
   post: Post
 }

 input PostInput{
   title: String
   content: String
 }

 type Mutation{

   signup(name: String!, email: String!, password: String!, bio: String): AuthPayload!

   signin (email: String!, password: String!): AuthPayload!

   addPost(post: PostInput!): PostPayload!

   updatePost(postId: ID!, post: PostInput ): PostPayload!

   deletePost(postId: ID!): PostPayload!

   publishPost(postId: ID!) : PostPayload!
 }
`;
