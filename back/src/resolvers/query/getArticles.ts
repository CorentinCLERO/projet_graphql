import { QueryResolvers } from "../../types.js";

export const getArticles : QueryResolvers["getArticles"] = async(_, __, context) => {
    if (!context.user) {
      return {
        code: 401,
        message: "Unauthorized",
        success: false,
        article: null,
      };
    }
    try {
      const articles = await context.dataSources.db.article.findMany({ include: {author: true}});
      if (!articles) {
        return {
          code: 404,
          message: "Articles not found",
          success: false,
          article: null,
        };
      }
      return {
        code: 200,
        message: "Articles found",
        success: true,
        articles: articles.map(article => {
          return {
            ...article,
            createdAt: article.createdAt.toISOString(),
            updatedAt: article.updatedAt.toISOString(),
          }
        })
        }
    } catch (e) {
      console.error(e);
      return {
        code: 400,
        message: "Failed to get articles",
        success: false,
        article: null,
      };
    }
  };
