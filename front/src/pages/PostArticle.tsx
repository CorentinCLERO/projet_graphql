import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { POST_ARTICLE_MUTATION } from '../graphql/mutations';

const PostArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postArticle] = useMutation(POST_ARTICLE_MUTATION);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postArticle({ variables: { title, content } });
  };

  return (
    <div>
      <h2>Post Article</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostArticle;
