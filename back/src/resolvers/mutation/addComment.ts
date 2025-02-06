import { MutationResolvers } from "../../types.js";

export const addComment: MutationResolvers["addComment"]= async(_, { articleId, content }, context) => {
    if (!context.user) {
      return {
        code: 401,
        message: "Unauthorized",
        success: false,
        comment: null,
      };
    }
    try {
      const newComment = await context.dataSources.db.comment.create({
        data: {
          content,
          authorId: context.user.id,
          articleId,
        },
        include: {
          author: true,
        }
      });
      return {
        code: 201,
        message: "Comment successfully created",
        success: true,
        comment: {
          id: newComment.id,
          content: newComment.content,
          author: {
            id: newComment.author.id,
            username: newComment.author.username,
          },
          createdAt: newComment.createdAt.toISOString(),
        }
      }
    } catch (e) {
      console.error(e);
      return {
        code: 400,
        message: "Failed to create comment",
        success: false,
        comment: null,
      };
    }
  };
