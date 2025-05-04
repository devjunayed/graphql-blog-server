import { userInfo } from "os";
import { PrismaContext } from "../../..";
import { checkUserAccess } from "../../../utils/checkUserAccess";

export const postResolvers = {
  addPost: async (
    parent: any,
    { post }: any,
    { prisma, userData }: PrismaContext
  ) => {
    if (!userData) {
      return {
        userError: "Unauthorized!",
        post: null,
      };
    }

    if (!post.title || !post.content) {
      return {
        userError: "All fields are required!",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: Number(userData.userId),
      },
      include: {
        author: true,
      },
    });

    console.log(newPost);
    return {
      post: newPost,
      userError: null,
    };
  },
  updatePost: async (
    parent: any,
    { post, postId }: any,
    { prisma, userData }: PrismaContext
  ) => {
    if (!userData) {
      return {
        userError: "Unauthorized!",
        post: null,
      };
    }
   
    // checking got will be here
    const error = await checkUserAccess(prisma, userData.userId, postId)

    if(error){
        console.log(error)
        return error
    }

    const result = await prisma.post.update({
      where: {
        id: Number(postId),
        authorId: Number(userData.userId),
      },
      data: {
        title: post.title,
        content: post.content,
      },
    });
    return {
      userError: null,
      post: result,
    };
  },
  deletePost: async (
    parent: any,
    {  postId }: any,
    { prisma, userData }: PrismaContext
  ) => {
    if (!userData) {
      return {
        userError: "Unauthorized!",
        post: null,
      };
    }
   
    // checking got will be here
    const error = await checkUserAccess(prisma, userData.userId, postId)

    if(error){
        console.log(error)
        return error
    }

    const result = await prisma.post.delete({
      where: {
        id: Number(postId),
        authorId: Number(userData.userId),
      },include: {
        author: true
      }
    });
    return {
      userError: null,
      post: result,
    };
  },
  publishPost: async (
    parent: any,
    { post, postId }: any,
    { prisma, userData }: PrismaContext
  ) => {
    if (!userData) {
      return {
        userError: "Unauthorized!",
        post: null,
      };
    }
   
    // checking got will be here
    const error = await checkUserAccess(prisma, userData.userId, postId)

    if(error){
        console.log(error)
        return error
    }

    const result = await prisma.post.update({
      where: {
        id: Number(postId),
        authorId: Number(userData.userId),
      },
      data: {
        published: true,
      },
      include: {
        author: true
      }
    });
    return {
      userError: null,
      post: result,
    };
  },
};
