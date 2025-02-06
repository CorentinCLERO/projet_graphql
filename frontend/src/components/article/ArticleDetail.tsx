import React, { useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
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

const ADD_COMMENT = gql`
mutation Mutation($articleId: ID!, $content: String!) {
  addComment(articleId: $articleId, content: $content) {
    code
    success
    message
    comment {
      id
      content
      author {
        id
        username
      }
      createdAt
    }
  }
}
`;

const ArticleDetail: React.FC<{ articleId: string, onClose: () => void, handleLike: (e: React.MouseEvent, articleId: string) => void }> = ({ articleId, onClose, handleLike }) => {
  const [newComment, setNewComment] = useState<string>("")
  const { user } = useUserContext();
  const { data, refetch } = useQuery<GetArticleQuery>(GET_ARTICLE, {
    variables: { id: articleId },
    skip: !user.token,
      context: {
        headers: {
          authorization: user.token ? user.token : "",
        },
      },
  });

  const [mutateFunction] = useMutation(ADD_COMMENT,
    {
      context: {
        headers: {
          authorization: user.token ? user.token : "",
        }
      },
    }
  );

  const [article, setArticle] = useState<ArticleType | null>(null)

  useEffect(() => {
    if (data && data.getArticle && data.getArticle.article) {
      setArticle(data.getArticle.article);
    }
  }, [data]);


  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await mutateFunction(
      {
        variables: {
          articleId: articleId,
          content: newComment
        }
      }
    )
    setNewComment("")
    await refetch()

    }

  const handleLikeArticle = async (e: React.MouseEvent, articleId: string) => {
    e.stopPropagation()
    await handleLike(e, articleId)
    refetch()
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
          <button className="like-button" onClick={(e) => handleLikeArticle(e, article?.id || "")}>
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
                <button type="submit" className="comment-submit" disabled={newComment.length === 0}>
                  Send
                </button>
              </form>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;