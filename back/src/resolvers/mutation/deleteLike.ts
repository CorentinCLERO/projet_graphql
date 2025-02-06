import { MutationResolvers } from "../../types.js";

export const deleteLike: MutationResolvers["deleteLike"] = async (_, __, context) => {
    if (!context.user) {
        return {
          code: 401,
          message: "Unauthorized",
          success: false,
        };
    }
    try {
        const like = await context.dataSources.db.like.findFirstOrThrow({
            where: { userId: context.user.id }
        });

        if (like.userId !== context.user.id) {
            return {
                code: 403,
                message: "Forbidden",
                success: false
            }
        }
        await context.dataSources.db.like.delete({ where: { id: like.id } });
        return {
            code: 200,
            message: "Like deleted",
            success: true
        }
    } catch (e) {
      console.error(e);
      return {
        code: 400,
        message: "Failed to delete like",
        success: false,
      };
    }
}