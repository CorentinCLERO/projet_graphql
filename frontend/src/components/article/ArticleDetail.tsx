import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GetArticleQuery } from '../../gql/graphql';
import { useUserContext } from '../../context/UserContext';
import { ArticleDetails as ArticleType } from "../../gql/graphql";

const GET_ARTICLE = gql`
query GetArticle($id: ID!) {
    getArticle(id: $id) {
      article {
        id
        title
        content
        author {
          id
          username
        }
        comments {
          id
          content
          author {
            id
            username
          }
          createdAt
        }
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

const ArticleDetail: React.FC<{ articleId: string, onClose: () => void }> = ({ articleId, onClose }) => {
  const { user } = useUserContext();
  const { data } = useQuery<GetArticleQuery>(GET_ARTICLE, {
    variables: { id: articleId },
    skip: !user.token,
      context: {
        headers: {
          authorization: user.token ? user.token : "",
        },
      },
  });


  const [article, setArticle] = useState<ArticleType | null>(null)

  useEffect(() => {
    if (data && data.getArticle && data.getArticle.article) {
      setArticle(data.getArticle.article);
    }
  }, [data]);

  const handleLike = (e: React.MouseEvent, articleId: string | undefined) => {
  }

  const [newComment, setNewComment] = useState("")

  const handleCommentSubmit = (e: React.FormEvent) => {
    // e.preventDefault()
    // if (newComment.trim() && selectedArticle) {
    //   const updatedArticle = {
    //     ...selectedArticle,
    //     comments: [
    //       ...selectedArticle.comments,
    //       {
    //         id: Date.now(),
    //         username: "currentUser",
    //         text: newComment.trim(),
    //       },
    //     ],
    //   }

    //   setArticles(articles.map((article) => (article.id === updatedArticle.id ? updatedArticle : article)))

    //   setSelectedArticle(updatedArticle)
    //   setNewComment("")
    }

  return (
    <div className="article-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-details">
          <span className="username">{article?.author.username}</span>
          <p className="article-content">{article?.content}</p>
          <button className="like-button" onClick={(e) => handleLike(e, article?.id)}>
                ❤️ {article?.likes?.length}
              </button>
          <div className="comments">
            {article?.comments?.map((comment) => (
              <div key={comment?.id} className="comment">
                <span className="comment-username">{comment?.author.username}</span>
                <span className="comment-text">{comment?.content}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="comment-form">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="comment-input"
                /><br></br>
                <button type="submit" className="comment-submit">
                  Send
                </button>
              </form>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;