import { gql, useQuery } from "@apollo/client";
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

const Article: React.FC = () => {
    const { user } = useUserContext();
    const { data } = useQuery<GetArticlesQuery>(GET_ARTICLES, {
      skip: !user.token,
      context: {
        headers: {
          authorization: user.token ? user.token : "",
        },
      },
    });
    const [articles, setArticles] = useState<ArticleType[] | null>([])
    const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null)
    useEffect(() => {
        if (data && data.getArticles && data.getArticles.articles) {
          setArticles(data.getArticles.articles.filter(article => article !== null));
          console.log(data.getArticles.articles)
        }
    }, [data]);

    const handleArticleClick = (article: ArticleType) => {
        setSelectedArticle(article)
    }

    const closeModal = () => {
        setSelectedArticle(null);
    };

    const handleLike = (e: React.MouseEvent, articleId: number) => {
      // e.stopPropagation()
      // setArticles(
      //   articles.map((article) => (article.id === articleId ? { ...article, likes: article.likes + 1 } : article)),
      // )
      // if (selectedArticle && selectedArticle.id === articleId) {
      //   setSelectedArticle({ ...selectedArticle, likes: selectedArticle.likes + 1 })
      // }
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
              ❤️ {article.likes?.length}
              </button>              
            </div>
            </div>
          ))}
          {selectedArticle && <ArticleDetail articleId={selectedArticle.id} onClose={closeModal} />}
        </div>
    );
}

export default Article;