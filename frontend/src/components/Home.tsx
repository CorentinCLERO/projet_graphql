import type React from "react"
import "../styleArticle.css"
import Article from "./article/Article";
import { gql, useQuery } from "@apollo/client";
import { useUserContext } from "../context/UserContext";
import { Article as ArticleType, GetArticlesQuery, GetAuthorsQuery, User } from "../gql/graphql";
import { useEffect, useState } from "react";

const GET_ARTICLES = gql`
  query GetArticles($authorId: String) {
    getArticles(authorId: $authorId) {
      code
      success
      message
      articles {
        id
        title
        content
        author {
          id
          username
        }
        createdAt
        updatedAt
        likes {
          id
          user {
            id
            username
          }
        }
      }
    }
  }
`;

const GET_AUTHORS = gql`
  query GetAuthors {
    getAuthors {
    code
    success
    message
    authors {
      id
      username
    }
    }
  }
`;

const Home: React.FC = () => {
  const { user } = useUserContext();
  const [authorId, setAuthorId] = useState<string | null>(null);
  const { data: articlesData, refetch } = useQuery<GetArticlesQuery>(GET_ARTICLES, {
    variables: { authorId },
    skip: !user.token,
    context: {
      headers: {
        authorization: user.token ? user.token : "",
      },
    },
  });
  const { data: authorsData } = useQuery<GetAuthorsQuery>(GET_AUTHORS, {
    skip: !user.token,
    context: {
      headers: {
        authorization: user.token ? user.token : "",
      }
  }
  });
  const [articles, setArticles] = useState<ArticleType[] | null>([]);
  const [authors, setAuthors] = useState<User[] | null>([]);
  useEffect(() => {
    if (articlesData && articlesData.getArticles && articlesData.getArticles.articles) {
      setArticles(articlesData.getArticles.articles.filter(article => article !== null));
      console.log(articlesData.getArticles.articles);
    }
  }, [articlesData]);

  useEffect(() => {
    if (authorsData && authorsData.getAuthors && authorsData.getAuthors.authors) {
      setAuthors(authorsData.getAuthors.authors.filter(author => author !== null));
      console.log("a",authorsData.getAuthors.authors);
    }
  }, [authorsData]);

  return (
    <>
      <div>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option value="">All Authors</option>
          {authors && authors.map(author => {
            return <option key={author.id} value={author.id}>{author.username}</option>
          })}
        </select>
      </div>
      <Article articles={articles} refetch={refetch} />
    </>
  );
}

export default Home;