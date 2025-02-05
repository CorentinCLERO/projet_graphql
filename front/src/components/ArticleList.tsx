import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Article from "./Article";

const GET_ARTICLES = gql`
  query {
    getArticles {
      id
      title
      content
    }
  }
`;

const ArticleList = () => {
  const { data, loading, error } = useQuery(GET_ARTICLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data.);

  return (
    <div>
      {data.getArticles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
