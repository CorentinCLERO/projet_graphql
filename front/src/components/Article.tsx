import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

// Mutation pour ajouter un like
const ADD_LIKE = gql`
  mutation addLike($articleId: ID!) {
    addLike(articleId: $articleId) {
      code
      message
      success
    }
  }
`;

// Mutation pour supprimer un like
const DELETE_LIKE = gql`
  mutation deleteLike($articleId: ID!) {
    deleteLike(articleId: $articleId) {
      code
      message
      success
    }
  }
`;

const Article = ({ article }) => {
  const [hasLiked, setHasLiked] = useState(false);

  const [addLike] = useMutation(ADD_LIKE, {
    onCompleted: () => setHasLiked(true),
  });

  const [deleteLike] = useMutation(DELETE_LIKE, {
    onCompleted: () => setHasLiked(false),
  });

  const handleLike = () => {
    if (hasLiked) {
      deleteLike({ variables: { articleId: article.id } });
    } else {
      addLike({ variables: { articleId: article.id } });
    }
  };

  return (
    <div className="article">
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <button onClick={handleLike}>{hasLiked ? "Unlike" : "Like"}</button>
    </div>
  );
};

export default Article;
