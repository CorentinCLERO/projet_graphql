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

  return (
    <div className="article-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-details">
          <span className="username">{article?.author.username}</span>
          <p className="article-content">{article?.content}</p>
          <span className="likes">{article?.likes?.length} likes</span>
          <div className="comments">
            {article?.comments?.map((comment) => (
              <div key={comment?.id} className="comment">
                <span className="comment-username">{comment?.author.username}</span>
                <span className="comment-text">{comment?.content}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;