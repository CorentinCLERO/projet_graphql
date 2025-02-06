import { MutationResolvers } from "../../types.js";

export const deleteArticle: MutationResolvers["deleteArticle"] = async(_, { id }, context) => {
    if (!context.user) {
      return {
        code: 401,
        message: "Unauthorized",
        success: false,
      };
    }
    try {
      const article = await context.dataSources.db.article.findFirstOrThrow({where: {id}, include: { author: true }})
      if (article.authorId !== context.user.id) {
        return {
          code: 403,
          message: "Forbidden",
          success: false
        }
      }
      await context.dataSources.db.article.delete({where: {id}})
      return {
        code: 200,
        message: "Article deleted",
        success: true
      }
    } catch (e) {
      console.error(e);
      return {
        code: 400,
        message: "Failed to delete article",
        success: false,
      };
    }
  };
