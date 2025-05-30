import { PrismaContext } from "../../..";
import { userLoader } from "../../../dataLoaders/userLoader";

export const Post = {
  author: async (
    parent: any,
    args: any,
    { prisma, userData }: PrismaContext
  ) => {
    return userLoader.load(parent.authorId)
  }
 
};
