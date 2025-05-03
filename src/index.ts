import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./graphql/resolvers";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export interface PrismaContext{
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
}

async function  main() {

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({req}): Promise<PrismaContext> => {
      console.log(req.headers.authorization)
      return{
        prisma
      }
    }
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

main();
