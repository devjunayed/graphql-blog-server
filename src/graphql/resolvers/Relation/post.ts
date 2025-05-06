import { PrismaContext } from "../../..";

export const Post = {
  author: async (
    parent: any,
    args: any,
    { prisma, userData }: PrismaContext
  ) => {
    return await prisma.user.findUnique({
        where: {
            id: Number(parent.authorId)
        }
    })
  },
  profile: async (
    parent: any,
    args: any,
    { prisma, userData }: PrismaContext
  ) => {
    return await prisma.profile.findUnique({
        where: {
            userId: Number(parent.authorId)
        }
    })
  },
};
