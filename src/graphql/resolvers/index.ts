import { PrismaClient } from "@prisma/client";

import { Query } from "./Query/Query";
import { Mutation } from "./Mutation/Mutation";


const prisma = new PrismaClient();
let userError = "";


export const resolvers = {
  Query,
  Mutation
};
