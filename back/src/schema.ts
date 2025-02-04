import ggl from 'graphql-tag';

export const typeDefs = ggl`
    type Mutation {
    createUser(username: String!, password: String!): CreateUserResponse
    }

    type Query {
    me: User
    }

    type User {
    id: ID!
    username: String!
    }
 
    type CreateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
    }
`;