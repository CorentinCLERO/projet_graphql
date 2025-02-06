import { Resolvers } from "../types.js";
import { createUser } from "./mutation/createUser.js";
import { logIn } from "./mutation/login.js";
import { addArticle } from "./mutation/addArticle.js";
import { deleteArticle } from "./mutation/deleteArticle.js";
import { updateArticle } from "./mutation/updateArticle.js";
import { addComment } from "./mutation/addComment.js";
import { deleteComment } from "./mutation/deleteComment.js";
import { me } from "./query/me.js";
import { getArticle } from "./query/getArticle.js";
import { getArticles } from "./query/getArticles.js";
import { addLike } from "./mutation/addLike.js";
import { deleteLike } from "./mutation/deleteLike.js";

export const resolvers: Resolvers = {
  Mutation: {
    createUser,
    logIn,
    addArticle,
    deleteArticle,
    updateArticle,
    addComment,
    deleteComment,
    addLike,
    deleteLike
  },
  Query: {
    me,
    getArticle,
    getArticles
  },
};
