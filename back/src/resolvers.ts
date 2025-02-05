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

      // Vérification que l'utilisateur est connecté
      if (!context.user) {
        return {
          code: 401,
          message: "Unauthorized",
          success: false,
          article: null,
        };
      }

      try {
        // Création de l'article
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
  },
};
