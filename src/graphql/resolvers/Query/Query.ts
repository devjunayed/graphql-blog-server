import { PrismaContext } from "../../..";


export const Query =  {
    users: async (parent: any, args: any, {prisma}: any) => {
      const result = await prisma.user.findMany();
      return result;
    },
    me: async (parent: any, args: any, {prisma, userData}: PrismaContext) => {
      const result = await prisma.user.findUnique({
        where: {
          id: Number(userData.userId),
        }
   
      });
      return result;
    },
    profile: async (parent: any, args: any, {prisma}: any) => {
      const result = await prisma.profile.findFirst({
        where: {
          userId: Number(args.id),
        },
       
      });
      return result;
    },
    posts: async(parent: any, args: any, {prisma}: PrismaContext) => {
      return await prisma.post.findMany({
        where: {
          published: true
        },
       
        orderBy: [
          {
            createdAt: 'asc'
          }
        ]
      });
    }
  };