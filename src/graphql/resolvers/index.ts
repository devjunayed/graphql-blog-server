import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { tokenToString } from "typescript";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: async () => {
      const result = await prisma.user.findMany();
      return result;
    },
    user: async (parent: any, args: any, context: any) => {
      console.log(args);
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
      const hashedPassword = await bcrypt.hash(args.password, 12);

      const result = await prisma.user.create({
        data: {
          ...args,
          password: hashedPassword,
        },
      });

      const generatedToken = jwt.sign(
        result,
        "a13a33e76be205cce064a1163a044491c2b7f4b0ff940550a9052fbc85bbe0e0",
        {
          expiresIn: "1d",
        }
      );

      return {
        data: result,
        token: generatedToken
      };
    },
  },
};
