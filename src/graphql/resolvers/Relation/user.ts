import { PrismaContext } from "../../..";

export const User = {
  posts: async (
    parent: any,
    args: any,
    { prisma, userData }: PrismaContext
  ) => {
    if (parent.id === userData.userId) {
      return await prisma.post.findMany({
        where: {
          authorId: Number(parent.id),
        },
      });
    }
    return await prisma.post.findMany({
      where: {
        authorId: Number(parent.id),
        published: true
      },
    });
  },
  profile: async (
    parent: any,
    args: any,
    { prisma, userData }: PrismaContext
  ) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(parent.id),
      },
    });
  },
};
