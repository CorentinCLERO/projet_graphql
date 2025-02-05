import { log } from "console";
import { comparePasswords, createJWT, hashPassword } from "./modules/auth.js";
import { Resolvers } from "./types.js";

export const resolvers: Resolvers = {
  Mutation: {
    createUser: async (_, { username, password }, context) => {
      try {
        const createdUser = await context.dataSources.db.user.create({
          data: {
            username,
            password: await hashPassword(password),
          },
        });

        return {
          code: 201,
          message: `User ${username} has been created`,
          success: true,
          user: {
            id: createdUser.id,
            username: createdUser.username,
          },
        };
      } catch (e) {
        console.error(e);
        return {
          code: 400,
          message: "Something bad happened",
          success: false,
          user: null,
        };
      }
    },
    signIn: async (_, { username, password }, context) => {
      const user = await context.dataSources.db.user.findUnique({
        where: { username },
      });
      if (!user) {
        return {
          code: 404,
          message: "User not found",
          success: false,
          token: null,
          user: null,
        };
      }
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        return {
          code: 401,
          message: "Invalid password",
          success: false,
          token: null,
          user: null,
        };
      }
      return {
        code: 200,
        message: "Successfully signed in",
        success: true,
        token: "Bearer " + createJWT(user),
        user: {
          id: user.id,
          username: user.username,
        },
      };
    },
    addArticle: async (_, { title, content }, context) => {
      console.log(context);

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
            likesCount: 0,
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
    },
    likeArticle: async (_, { articleId }, context) => {
      if (!context.user) {
        return {
          code: 401,
          message: "Unauthorized",
          success: false,
          article: null,
        };
      }

      try {
        const article = await context.dataSources.db.article.findUnique({
          where: { id: articleId },
          include: { author: true },
        });

        if (!article) {
          return {
            code: 404,
            message: "Article not found",
            success: false,
            article: null,
          };
        }

        const existingLike = await context.dataSources.db.like.findUnique({
          where: {
            userId_articleId: {
              userId: context.user.id,
              articleId: articleId,
            },
          },
        });

        if (existingLike) {
          return {
            code: 400,
            message: "You have already liked this article",
            success: false,
            article: null,
          };
        }


        await context.dataSources.db.like.create({
          data: {
            userId: context.user.id,
            articleId: articleId,
          },
        });


        const likesCount = await context.dataSources.db.like.count({
          where: { articleId: articleId },
        });

        return {
          code: 200,
          message: "Article liked successfully",
          success: true,
          article: {
            id: article.id,
            title: article.title,
            content: article.content,
            author: {
              id: article.author.id,
              username: article.author.username,
            },
            likesCount,
            createdAt: article.createdAt.toISOString(),
          },
        };
      } catch (e) {
        console.error(e);
        return {
          code: 500,
          message: "Failed to like the article",
          success: false,
          article: null,
        };
      }
    },
    deleteLike: async (_, { articleId }, context) => {
      if (!context.user) {
        return {
          code: 401,
          message: "Unauthorized",
          success: false,
        };
      }
    
      try {
        const existingLike = await context.dataSources.db.like.findUnique({
          where: {
            userId_articleId: {
              userId: context.user.id,
              articleId: articleId,
            },
          },
        });
    
        if (!existingLike) {
          return {
            code: 404,
            message: "Like not found",
            success: false,
          };
        }
    
        await context.dataSources.db.like.delete({
          where: {
            id: existingLike.id,
          },
        });
    
        return {
          code: 200,
          message: "Like deleted successfully",
          success: true,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 500,
          message: "Failed to delete like",
          success: false,
        };
      }
    },
    
  },
  Query: {
    me: async (_, __, context) => {
      if (!context.user) {
        return {
          code: 401,
          message: "Unauthorized",
          success: false,
          user: null,
        };
      }
      const user = await context.dataSources.db.user.findUnique({
        where: { id: context.user?.id },
      });
      if (!user) {
        return {
          code: 404,
          message: "User not found",
          success: false,
          user: null,
        };
      }
      return {
        code: 200,
        message: "User found",
        success: true,
        user: {
          id: user.id,
          username: user.username,
        },
      };
    },
    getArticles: async (_, __, context) => {
      const articles = await context.dataSources.db.article.findMany({
        include: {
          author: true,
          likes: true,
        },
      });

      return articles.map((article) => ({
        id: article.id,
        title: article.title,
        content: article.content,
        author: {
          id: article.author.id,
          username: article.author.username,
        },
        likesCount: article.likes.length,
        createdAt: article.createdAt.toISOString(),
      }));
    },
  },
};
