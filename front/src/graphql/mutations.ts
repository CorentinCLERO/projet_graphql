import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const POST_ARTICLE_MUTATION = gql`
  mutation PostArticle($title: String!, $content: String!) {
    postArticle(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;
