import { User } from "@prisma/client";
import { prisma } from "..";
import DataLoader from "dataloader";

const batchUsers = async (ids: number[]): Promise<User[]> => {
    console.log(ids)
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  console.log({users})

  const userData: { [key: string]: User } = {};
  users.forEach((user) => {
    userData[user.id] = user
  });
  console.log({userData})

  const returnData = ids.map(id => userData[id])
  console.log({returnData})
  return returnData;
};

// @ts-ignore
export const userLoader = new DataLoader<number, User >(batchUsers)
