import type React from "react"
import "../styleArticle.css"
import Article from "./article/Article";
import { gql, useQuery } from "@apollo/client";
import { useUserContext } from "../context/UserContext";
import { Article as ArticleType, GetArticlesQuery } from "../gql/graphql";
import { useEffect, useState } from "react";

const GET_ARTICLES = gql`
  query GetArticles {
    getArticles {
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

const Home: React.FC = () => {
  const { user } = useUserContext();
  const { data, refetch } = useQuery<GetArticlesQuery>(GET_ARTICLES, {
    skip: !user.token,
    context: {
      headers: {
        authorization: user.token ? user.token : "",
      },
    },
  });
  const [articles, setArticles] = useState<ArticleType[] | null>([])
    useEffect(() => {
        if (data && data.getArticles && data.getArticles.articles) {
          setArticles(data.getArticles.articles.filter(article => article !== null));
          console.log(data.getArticles.articles)
        }
    }, [data]);
  return (
    <>
      <Article articles={articles} refetch={refetch}/>
    </>
  )
}

export default Home

