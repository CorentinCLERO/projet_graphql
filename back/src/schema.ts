import ggl from 'graphql-tag';

export const typeDefs = ggl`
    type Mutation {
        createUser(username: String!, password: String!): CreateUserResponse
        signIn(username: String!, password: String!): SignInResponse
        addArticle(title: String!, content: String!): AddArticleResponse
        likeArticle(articleId: ID!): LikeArticleResponse
         deleteLike(articleId: ID!): LikeResponse!
    }

    type Query {
        me: getUserResponse
        getArticles: [Article]
    }

    type User {
        id: ID!
        username: String!
    }

    type Article {
        id: ID!
        title: String!
        content: String!
        author: User!
        likesCount: Int!
        createdAt: String!
    }

    type getUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        user: User
    }

    type CreateUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        user: User
    }

    type SignInResponse {
        code: Int!
        success: Boolean!
        message: String!
        token: String
        user: User
    }

    type AddArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
        article: Article
    }

    type LikeArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
        article: Article
    }
    type LikeResponse {
        code: Int!
        message: String!
        success: Boolean!
    }

`;
