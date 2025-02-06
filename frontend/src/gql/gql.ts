/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetArticles($authorId: String) {\n    getArticles(authorId: $authorId) {\n      code\n      success\n      message\n      articles {\n        id\n        title\n        content\n        author {\n          id\n          username\n        }\n        createdAt\n        updatedAt\n        likes {\n          id\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetArticlesDocument,
    "\n  query GetAuthors {\n    getAuthors {\n    code\n    success\n    message\n    authors {\n      id\n      username\n    }\n    }\n  }\n": typeof types.GetAuthorsDocument,
    "\n  mutation LogIn($username: String!, $password: String!) {\n    logIn(username: $username, password: $password) {\n      code\n      success\n      message\n      token\n      user {\n        id\n        username\n      }\n    }\n  }\n": typeof types.LogInDocument,
    "\n  mutation SignIn($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      code\n      success\n      message\n      user {\n        id\n        username\n      }\n    }\n  }\n": typeof types.SignInDocument,
    "\n  mutation AddLike($articleId: ID!) {\n    addLike(articleId: $articleId) {\n      code\n      success\n      message\n      like {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": typeof types.AddLikeDocument,
    "\n  mutation DeleteLike($deleteLikeId: ID!) {\n    deleteLike(id: $deleteLikeId) {\n      code\n      success\n      message\n    }\n  }\n": typeof types.DeleteLikeDocument,
    "\nquery GetArticle($id: ID!) {\n    getArticle(id: $id) {\n      article {\n        id\n        title\n        content\n        author {\n          id\n          username\n        }\n        comments {\n          id\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n        }\n        likes {\n          id\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetArticleDocument,
    "\nmutation Mutation($articleId: ID!, $content: String!) {\n  addComment(articleId: $articleId, content: $content) {\n    code\n    success\n    message\n    comment {\n      id\n      content\n      author {\n        id\n        username\n      }\n      createdAt\n    }\n  }\n}\n": typeof types.MutationDocument,
    "\n  query Query {\n    me {\n      code\n      success\n      message\n      user {\n        id\n        username\n      }\n    }\n  } \n": typeof types.QueryDocument,
};
const documents: Documents = {
    "\n  query GetArticles($authorId: String) {\n    getArticles(authorId: $authorId) {\n      code\n      success\n      message\n      articles {\n        id\n        title\n        content\n        author {\n          id\n          username\n        }\n        createdAt\n        updatedAt\n        likes {\n          id\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n": types.GetArticlesDocument,
    "\n  query GetAuthors {\n    getAuthors {\n    code\n    success\n    message\n    authors {\n      id\n      username\n    }\n    }\n  }\n": types.GetAuthorsDocument,
    "\n  mutation LogIn($username: String!, $password: String!) {\n    logIn(username: $username, password: $password) {\n      code\n      success\n      message\n      token\n      user {\n        id\n        username\n      }\n    }\n  }\n": types.LogInDocument,
    "\n  mutation SignIn($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      code\n      success\n      message\n      user {\n        id\n        username\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  mutation AddLike($articleId: ID!) {\n    addLike(articleId: $articleId) {\n      code\n      success\n      message\n      like {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": types.AddLikeDocument,
    "\n  mutation DeleteLike($deleteLikeId: ID!) {\n    deleteLike(id: $deleteLikeId) {\n      code\n      success\n      message\n    }\n  }\n": types.DeleteLikeDocument,
    "\nquery GetArticle($id: ID!) {\n    getArticle(id: $id) {\n      article {\n        id\n        title\n        content\n        author {\n          id\n          username\n        }\n        comments {\n          id\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n        }\n        likes {\n          id\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n": types.GetArticleDocument,
    "\nmutation Mutation($articleId: ID!, $content: String!) {\n  addComment(articleId: $articleId, content: $content) {\n    code\n    success\n    message\n    comment {\n      id\n      content\n      author {\n        id\n        username\n      }\n      createdAt\n    }\n  }\n}\n": types.MutationDocument,
    "\n  query Query {\n    me {\n      code\n      success\n      message\n      user {\n        id\n        username\n      }\n    }\n  } \n": types.QueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetArticles($authorId: String) {\n    getArticles(authorId: $authorId) {\n      code\n      success\n      message\n      articles {\n        id\n        title\n        content\n        author {\n          id\n          username\n        }\n        createdAt\n        updatedAt\n        likes {\n          id\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetArticles($authorId: String) {\n    getArticles(authorId: $authorId) {\n      code\n      success\n      message\n      articles {\n        id\n        title\n        content\n        author {\n          id\n          username\n        }\n        createdAt\n        updatedAt\n        likes {\n          id\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAuthors {\n    getAuthors {\n    code\n    success\n    message\n    authors {\n      id\n      username\n    }\n    }\n  }\n"): (typeof documents)["\n  query GetAuthors {\n    getAuthors {\n    code\n    success\n    message\n    authors {\n      id\n      username\n    }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogIn($username: String!, $password: String!) {\n    logIn(username: $username, password: $password) {\n      code\n      success\n      message\n      token\n      user {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LogIn($username: String!, $password: String!) {\n    logIn(username: $username, password: $password) {\n      code\n      success\n      message\n      token\n      user {\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      code\n      success\n      message\n      user {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      code\n      success\n      message\n      user {\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddLike($articleId: ID!) {\n    addLike(articleId: $articleId) {\n      code\n      success\n      message\n      like {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddLike($articleId: ID!) {\n    addLike(articleId: $articleId) {\n      code\n      success\n      message\n      like {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteLike($deleteLikeId: ID!) {\n    deleteLike(id: $deleteLikeId) {\n      code\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteLike($deleteLikeId: ID!) {\n    deleteLike(id: $deleteLikeId) {\n      code\n      success\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetArticle($id: ID!) {\n    getArticle(id: $id) {\n      article {\n        id\n        title\n        content\n        author {\n          id\n          username\n        }\n        comments {\n          id\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n        }\n        likes {\n          id\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\nquery GetArticle($id: ID!) {\n    getArticle(id: $id) {\n      article {\n        id\n        title\n        content\n        author {\n          id\n          username\n        }\n        comments {\n          id\n          content\n          author {\n            id\n            username\n          }\n          createdAt\n        }\n        likes {\n          id\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation Mutation($articleId: ID!, $content: String!) {\n  addComment(articleId: $articleId, content: $content) {\n    code\n    success\n    message\n    comment {\n      id\n      content\n      author {\n        id\n        username\n      }\n      createdAt\n    }\n  }\n}\n"): (typeof documents)["\nmutation Mutation($articleId: ID!, $content: String!) {\n  addComment(articleId: $articleId, content: $content) {\n    code\n    success\n    message\n    comment {\n      id\n      content\n      author {\n        id\n        username\n      }\n      createdAt\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query {\n    me {\n      code\n      success\n      message\n      user {\n        id\n        username\n      }\n    }\n  } \n"): (typeof documents)["\n  query Query {\n    me {\n      code\n      success\n      message\n      user {\n        id\n        username\n      }\n    }\n  } \n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;