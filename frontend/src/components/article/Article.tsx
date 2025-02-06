import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ArticleDetail from "./ArticleDetail";
import { useUserContext } from "../../context/UserContext";
import { Article as ArticleType, GetArticlesQuery } from "../../gql/graphql";

const GET_ARTICLES = gql`
  query GetArticles {
    getArticles {
      code
      success
      message
      articles {
        id
        title
        content
        author {
          id
          username
        }
        createdAt
        updatedAt
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

const ADD_LIKE = gql`
  mutation AddLike($articleId: ID!) {
    addLike(articleId: $articleId) {
      code
      success
      message
      like {
        id
        user {
          id
          username
        }
      }
    }
  }
`;

const REMOVE_LIKE = gql`
  mutation DeleteLike($deleteLikeId: ID!) {
    deleteLike(id: $deleteLikeId) {
      code
      success
      message
    }
  }
`;

const Article: React.FC = () => {
  const { user } = useUserContext();
  const { data, refetch } = useQuery<GetArticlesQuery>(GET_ARTICLES, {
    skip: !user.token,
    context: {
      headers: {
        authorization: user.token ? user.token : "",
      },
    },
  });
  const [articles, setArticles] = useState<ArticleType[] | null>([])
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null)
  const [addLike] = useMutation(ADD_LIKE, {
    context: {
      headers: {
        authorization: user.token ? user.token : "",
      },
    },
  })
  const [removeLike] = useMutation(REMOVE_LIKE, {
    context: {
      headers: {
        authorization: user.token ? user.token : "",
      },
    },
  })

  useEffect(() => {
      if (data && data.getArticles && data.getArticles.articles) {
        setArticles(data.getArticles.articles.filter(article => article !== null));
      }
  }, [data]);

  const handleArticleClick = (article: ArticleType) => {
      setSelectedArticle(article)
  }

  const closeModal = () => {
      setSelectedArticle(null);
  };

  const handleLike = async (e: React.MouseEvent, articleId: string) => {
    e.stopPropagation()
    console.log(articleId, user)
    try {
      const response = await addLike({ variables: { articleId } });
      if (response.data.addLike.success && articles) {
        articles.map((article) => {
          if (article.id === articleId) {
            refetch();
          }
          return article;
        });
      } else {
        const removeResponse = await removeLike({ variables: { deleteLikeId: articleId } });
        if (removeResponse.data.deleteLike.success && articles) {
          articles.map((article) => {
            if (article.id === articleId) {
              refetch();
            }
            return article;
          });
        }
      }
    } catch (error) {
      console.error('Error during AddLike:', error);
    }
  }

  return (
      <div className="feed-container">
        {articles?.map((article) => (
          <div key={article.id} className="article" onClick={() => handleArticleClick(article)}>
            <div className="article-header">
              <span className="username">{article.author.username}</span>
            </div>
            <div className="article-content">
              <p>{article.content}</p>
            </div>
            <div className="article-footer">
            <button className="like-button" onClick={(e) => handleLike(e, article.id)}>
            ❤️ {article?.likes?.length}
            </button>         
          </div>
          </div>
        ))}
        {selectedArticle && <ArticleDetail articleId={selectedArticle.id} onClose={closeModal} handleLike={handleLike} />}
      </div>
  );
}

export default Article;