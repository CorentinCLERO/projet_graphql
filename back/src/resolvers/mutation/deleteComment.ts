import { MutationResolvers } from "../../types.js";

export const deleteComment: MutationResolvers["deleteComment"] = async(_, { id }, context) => {
    if (!context.user) {
      return {
        code: 401,
        message: "Unauthorized",
        success: false,
      };
    }
    try {
      const comment = await context.dataSources.db.comment.findFirstOrThrow({where: {id}, include: { author: true }})
      if (comment.authorId !== context.user.id) {
        return {
          code: 403,
          message: "Forbidden",
          success: false
        }
      }
      await context.dataSources.db.comment.delete({where: {id}})
      return {
        code: 200,
        message: "Comment deleted",
        success: true
      }
    } catch (e) {
      return {
        code: 400,
        message: "Failed to delete comment",
        success: false,
      };
    }
  };
