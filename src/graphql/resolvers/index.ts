import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { jwtHelper } from "../../utils/jwtHelper";

const prisma = new PrismaClient();
let userError = "";
dotenv.config();

export const resolvers = {
  Query: {
    users: async () => {
      const result = await prisma.user.findMany();
      return result;
    },
    user: async (parent: any, args: any, context: any) => {
      const result = await prisma.user.findFirst({
        where: {
          id: Number(args.id),
        },
      });
      return result;
    },
  },
  Mutation: {
    signup: async (parent: any, args: any, context: any) => {

      const isExist = await prisma.user.findFirst({
        where: {
          email: args.email
        }
      })

      if(isExist){
        return {
          userError: "Alreadyl this emails is registered!",
          token: null
        }
      }

      const hashedPassword = await bcrypt.hash(args.password, 12);

      const result = await prisma.user.create({
        data: {
          ...args,
          password: hashedPassword,
        },
      });

      const generatedToken = await jwtHelper.sign({userId: result.id as number})

      return {
        token: generatedToken,
      };
    },
    signin: async (parent: any, args: any, context: any) => {
      
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

      const verifiedPassword = await bcrypt.compare(
        args.password,
        user.password
      );

      if (!verifiedPassword) {
        return {
          userError: "User not found",
          token: null,
        };
      }

       const generatedToken = await jwtHelper.sign({userId: user.id as number})


      return { userError: null, token: generatedToken };
    },
  },
};
