import React, { useState } from "react";


const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Article Created", { title, content });

    setTitle('');
    setContent('');

    window.location.href = '/Article';  
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Article</h2>
      <form onSubmit={handleCreateArticle}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <div className="form-actions">
           
          <button type="submit" > Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
