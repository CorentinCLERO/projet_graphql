import type React from "react"
import { useState } from "react"
import "../styleArticle.css"

interface Comment {
  id: number
  username: string
  text: string
}

interface Article {
  id: number
  username: string
  content: string
  likes: number
  comments: Comment[]
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      username: "user1",
      content:
        "This is a sample tweet-like post. It can contain quite a bit of text, discussing various topics or sharing thoughts.",
      likes: 10,
      comments: [
        { id: 1, username: "user2", text: "Great post!" },
        { id: 2, username: "user3", text: "Interesting thoughts!" },
      ],
    },
    {
      id: 2,
      username: "user2",
      content:
        "Another example of a text-based post. This platform seems to focus on sharing ideas and engaging in discussions.",
      likes: 15,
      comments: [{ id: 3, username: "user1", text: "I agree with your point!" }],
    },
  ])

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article)
  }

  const handleClose = () => {
    setSelectedArticle(null)
  }

  return (
    <div className="feed-container">
      {articles.map((article) => (
        <div key={article.id} className="article" onClick={() => handleArticleClick(article)}>
          <div className="article-header">
            <span className="username">{article.username}</span>
          </div>
          <div className="article-content">
            <p>{article.content}</p>
          </div>
          <div className="article-footer">
            <span className="likes">{article.likes} likes</span>
          </div>
        </div>
      ))}

      {selectedArticle && (
        <div className="article-modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <div className="modal-details">
              <span className="username">{selectedArticle.username}</span>
              <p className="article-content">{selectedArticle.content}</p>
              <span className="likes">{selectedArticle.likes} likes</span>
              <div className="comments">
                {selectedArticle.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <span className="comment-username">{comment.username}</span>
                    <span className="comment-text">{comment.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

