import ggl from "graphql-tag";

export const typeDefs = ggl`
    type Mutation {
        createUser(username: String!, password: String!): CreateUserResponse
        signIn(username: String!, password: String!): SignInResponse
        addArticle(title: String!, content: String!): AddArticleResponse
        deleteArticle(id: ID!): DeleteArticleResponse
        updateArticle(id: ID!, data: UpdateArticleProps!): UpdateArticleResponse
        addComment(articleId: ID!, content: String!): AddCommentResponse
        deleteComment(id: ID!): DeleteCommentResponse
    }

    type Query {
        me: getUserResponse
        getArticle(id: ID!): GetArticleResponse
        getArticles: GetArticlesResponse
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
        createdAt: String!
        updatedAt: String
    }

    type ArticleDetails {
        id: ID!
        title: String!
        content: String!
        author: User!
        comments: [Comment]
    }

    type Comment {
        id: ID!
        content: String!
        author: User!
        createdAt: String!
    }

    input UpdateArticleProps {
        title: String
        content: String
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

    type GetArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
        article: ArticleDetails
    }

    type GetArticlesResponse {
        code: Int!
        success: Boolean!
        message: String!
        articles: [Article]
    }
    
    type DeleteArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
    }
    
    type UpdateArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
        article: Article
    }

    type AddCommentResponse {
        code: Int!
        success: Boolean!
        message: String!
        comment: Comment
    }

    type DeleteCommentResponse {
        code: Int!
        success: Boolean!
        message: String!
    }
`;
