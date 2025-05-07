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
      const result = await prisma.profile.findUnique({
        where: {
          userId: Number(args.id),
        },
       
      });
      return result;
    },
    profiles: async (parent: any, args: any, {prisma, userData}: any) => {
      const result = await prisma.profile.findMany({});
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