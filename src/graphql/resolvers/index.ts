import { Query } from "./Query/Query";
import { Mutation } from "./Mutation/Mutation";
import { Post } from "./Relation/post";
import { User } from "./Relation/user";
import { Profile } from "./Relation/profile";

export const resolvers = {
  Query,
  Mutation,
  Post,
  Profile,
  User
};
