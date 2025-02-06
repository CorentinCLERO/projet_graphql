import { QueryResolvers } from "../../types.js";

export const getArticle: QueryResolvers["getArticle"] = async(_, { id }, context) => {
    if (!context.user) {
      return {
        code: 401,
        message: "Unauthorized",
        success: false,
        article: null,
      };
    }
    try {
      const article = await context.dataSources.db.article.findFirstOrThrow({ where: {id}, include: {author: true, comments: true}});
      const comments = await context.dataSources.db.comment.findMany({where: {articleId: id}, include: {author: true}})
      if (!article) {
        return {
          code: 404,
          message: "Article not found",
          success: false,
          article: null,
        };
      }
      return {
        code: 200,
        message: "Article found",
        success: true,
        article: {
          ...article,
          createdAt: article.createdAt.toISOString(),
          updatedAt: article.updatedAt.toISOString(),
          comments: comments.map(comment => {
            return {
              ...comment,
              createdAt: comment.createdAt.toISOString()
            }
          })
        }
      }
    } catch (e) {
      console.error(e);
      return {
        code: 400,
        message: "Failed to get article",
        success: false,
        article: null,
      };
    }
  };
  