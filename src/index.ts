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

interface PrismaContext{
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
}

async function  main() {

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async (): Promise<PrismaContext> => {
      return{
        prisma
      }
    }
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

main();
