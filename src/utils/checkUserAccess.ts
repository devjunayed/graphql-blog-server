export const checkUserAccess = async(prisma: any, userId: any, postId: any) => {
    const user = await prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });
  
      if (!user) {
        return {
          userError: "User not found",
          post: null,
        };
      }
  
      const postData = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });
  
      if (!postData) {
        return {
          userError: "Post not found",
          post: null,
        };
      }
  
      if (postData.authorId !== user.id) {
        return {
          userError: "Post doesn't belong to you  ",
          post: null,
        };
      }
}