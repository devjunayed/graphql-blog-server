import { PrismaContext } from "../../..";

export const Profile = {
    user: async(parent: any, args: any, {prisma, userData}: PrismaContext) => {
        const user = await prisma.user.findFirst({
            where: {
                id: Number(parent.userId)
            }
        });
        if (!user) return null;
        return user
    }
}
