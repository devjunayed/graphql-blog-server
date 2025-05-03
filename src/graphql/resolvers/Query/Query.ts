

export const Query =  {
    users: async (parent: any, args: any, {prisma}: any) => {
      const result = await prisma.user.findMany();
      return result;
    },
    user: async (parent: any, args: any, {prisma}: any) => {
      const result = await prisma.user.findFirst({
        where: {
          id: Number(args.id),
        },
        include: {
          profile: true,
          posts: true
        }
      });
      return result;
    },
    profile: async (parent: any, args: any, {prisma}: any) => {
      const result = await prisma.profile.findFirst({
        where: {
          userId: Number(args.id),
        },
        include:{
          user: true
        }
      });
      return result;
    },
  };