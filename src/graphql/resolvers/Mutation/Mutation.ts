import bcrypt from "bcrypt";
import { jwtHelper } from "../../../utils/jwtHelper";
import config from "../../../config";
import { PrismaContext } from "../../..";
import { userInfo } from "os";

export interface userInfo {
  id?: number;
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const Mutation = {
  signup: async (parent: any, args: userInfo, { prisma }: any) => {
    const isExist = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (isExist) {
      return {
        userError: "Alreadyl this emails is registered!",
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(args.password, 12);

    const result = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: result.id,
        },
      });
    }

    const generatedToken = await jwtHelper.sign(
      {
        userId: result.id as number,
      },
      config.jwt.secret as string
    );

    return {
      token: generatedToken,
    };
  },
  signin: async (parent: any, args: any, { prisma }: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      return {
        userError: "User not found!",
        token: null,
      };
    }

    const verifiedPassword = await bcrypt.compare(args.password, user.password);

    if (!verifiedPassword) {
      return {
        userError: "User not found",
        token: null,
      };
    }

    const generatedToken = await jwtHelper.sign(
      {
        userId: user.id as number,
      },
      config.jwt.secret as string
    );

    return { userError: null, token: generatedToken };
  },
  addPost: async (
    parent: any,
    args: any,
    { prisma, userData }: PrismaContext
  ) => {
   
    if (!userInfo) {
      return {
        userError: "Unauthorized!",
        post: null,
      };
    }

   
    if(!args.title || !args.content){
      return {
        userError: "All fields are required!",
        post: null,
      };
    }

     const newPost = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: Number(userData.userId)
      },
      include: {
        author: true
      }
    })

    console.log(newPost)
    return {
      post: newPost,
      userError: null
    };
    
  },
};
