import { comparePasswords, createJWT, hashPassword } from "./modules/auth.js";
import { Resolvers } from "./types.js";

export const resolvers: Resolvers = {
    Mutation: {
      createUser: async (_, {username, password}, context) => {
          try {
            const createdUser = await context.dataSources.db.user.create({
              data: {
                username,
                password: await hashPassword(password)
              }
            })
      
            return {
              code: 201,
              message: `User ${username} has been created`,
              success: true,
              user: {
                id: createdUser.id,
                username: createdUser.username
              }
            }
          } catch {
            return {
              code: 400,
              message: 'Something bad happened',
              success: false,
              user: null
            }
          }
        },
        signIn: async (_, {username, password}, context) => {
          const user = await context.dataSources.db.user.findUnique({where: {username}})
          if (!user) {
            return {
              code: 404,
              message: 'User not found',
              success: false,
              token: null,
              user: null
            }
          }
          const isPasswordValid = await comparePasswords(password, user.password)
          if (!isPasswordValid) {
            return {
              code: 401,
              message: 'Invalid password',
              success: false,
              token: null,
              user: null
            }
          }
          return {
            code: 200,
            message: 'Successfully signed in',
            success: true,
            token: "Bearer "+createJWT(user),
            user: {
              id: user.id,
              username: user.username
            }
          }
        }
    },
    Query: {
      me: async (_, __, context) => {
        if (!context.user) {
          return {
            code: 401,
            message: 'Unauthorized',
            success: false,
            user: null
          }
        }
        const user = await context.dataSources.db.user.findUnique({where: {id: context.user?.id}})
        if (!user) {
          return {
            code: 404,
            message: 'User not found',
            success: false,
            user: null
          }
        }
        return {
          code: 200,
          message: 'User found',
          success: true,
          user: {
            id: user.id,
            username: user.username
          }
        }
      }
    }
}