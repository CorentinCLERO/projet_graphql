import { MutationResolvers } from "../../types.js";

export const addArticle: MutationResolvers["addArticle"] = async (_, { title, content }, context) => {
    if (!context.user) {
      return {
        code: 401,
        message: "Unauthorized",
        success: false,
        article: null,
      };
    }

    try {
      const newArticle = await context.dataSources.db.article.create({
        data: {
          title,
          content,
          authorId: context.user.id,
        },
        include: {
          author: true,
        },
      });

      return {
        code: 201,
        message: "Article successfully created",
        success: true,
        article: {
          id: newArticle.id,
          title: newArticle.title,
          content: newArticle.content,
          author: {
            id: newArticle.author.id,
            username: newArticle.author.username,
          },
          createdAt: newArticle.createdAt.toISOString(),
        },
      };
    } catch (e) {
      console.error(e);
      return {
        code: 400,
        message: "Failed to create article",
        success: false,
        article: null,
      };
    }
  };
