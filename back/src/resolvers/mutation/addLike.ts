import { MutationResolvers } from "../../types.js";

export const addLike: MutationResolvers["addLike"] = async (_, { articleId }, context) => {
    if (!context.user) {
        return {
          code: 401,
          message: "Unauthorized",
          success: false,
          like: null,
        };
    }
    try {
        const existLike = await context.dataSources.db.like.findFirst({
            where: {
                articleId,
                userId: context.user.id
            }
        });
        if (existLike) {
            return {
                code: 400,
                message: "User has already liked this article",
                success: false,
                like: null,
            };
        }
        const addLike = await context.dataSources.db.like.create({
            data: {
                articleId,
                userId: context.user.id
            }, include: {
                user: true
            }
        })
        return ({
            code: 201,
            message: "Like successfully created",
            success: true,
            like: {
                id: addLike.id,
                user: {
                    id: addLike.user.id,
                    username: addLike.user.username
                },
            }
        });
    } catch (e) {
        console.error(e);
        return {
          code: 400,
          message: "Failed to add like",
          success: false,
          like: null,
        };
      }
}