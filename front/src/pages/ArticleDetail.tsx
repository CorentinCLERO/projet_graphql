import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ARTICLE_DETAILS_QUERY } from '../graphql/queries';

const ArticleDetail = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery(GET_ARTICLE_DETAILS_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{data.article.title}</h2>
      <p>{data.article.content}</p>
      <div>
        <h3>Comments</h3>
        <ul>
          {data.article.comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleDetail;
