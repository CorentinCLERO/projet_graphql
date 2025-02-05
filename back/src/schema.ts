import ggl from 'graphql-tag';

export const typeDefs = ggl`
    type Mutation {
    createUser(username: String!, password: String!): CreateUserResponse
    signIn(username: String!, password: String!): SignInResponse
    }

    type Query {
    me: getUserResponse
    }

    type User {
    id: ID!
    username: String!
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
`;