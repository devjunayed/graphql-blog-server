import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./graphql/resolvers";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { jwtHelper } from "./utils/jwtHelper";
import config from "./config";

export const prisma = new PrismaClient();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export interface PrismaContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userData: {
    userId: number | null;
  };
}

async function main() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<PrismaContext > => {
      const userId = await jwtHelper.verify(
        req.headers.authorization as string,
        config.jwt.secret as string
      );
      return {
        userData: {userId},
        prisma,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main();
