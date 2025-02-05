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
    },
    deleteArticle: async(_, { id }, context) => {
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
    },
    updateArticle: async (_, { id, data }, context) => {
      try {
        if (!context.user) {
          return {
            code: 401,
            message: "Unauthorized",
            success: false
          };
        }
    
        const article = await context.dataSources.db.article.findUnique({ where: { id }, include: {author: true} });
    
        if (!article) {
          return {
            code: 404,
            message: "Article not found",
            success: false
          };
        }
    
        if (article.authorId !== context.user.id) {
          return {
            code: 403,
            message: "Forbidden",
            success: false
          };
        }
    
        const updatedArticle = await context.dataSources.db.article.update({
          where: { id },
          data: {
            title: data.title ?? article.title,
            content: data.content ?? article.content
            
          },
          include: { author: true }
        });
    
        return {
          code: 200,
          message: "Article updated",
          success: true,
          article: {
            ...updatedArticle,
            createdAt: updatedArticle.createdAt.toISOString(),
            updatedAt: new Date().toISOString()
          }
        };
      } catch (e) {
        console.error(e);
        return {
          code: 400,
          message: "Failed to update article",
          success: false
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
    getArticle: async(_, { id }, context) => {
      if (!context.user) {
        return {
          code: 401,
          message: "Unauthorized",
          success: false,
          article: null,
        };
      }
      try {
        const article = await context.dataSources.db.article.findFirstOrThrow({ where: {id}, include: {author: true}})
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
    },
    getArticles: async(_, __, context) => {
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
    }
  },
};
