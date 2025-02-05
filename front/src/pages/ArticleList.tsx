import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ARTICLES_QUERY } from '../graphql/queries';

const ArticleList = () => {
  const { data, loading, error } = useQuery(GET_ARTICLES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {data.articles.map((article) => (
          <li key={article.id}>
            <a href={`/articles/${article.id}`}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
