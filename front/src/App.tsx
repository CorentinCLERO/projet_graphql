// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PostArticle from './pages/PostArticle';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'inscription */}
        <Route path="/signup" element={<Signup />} />

        {/* Route pour la page de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Route pour la page de publication d'un article */}
        <Route path="/post" element={<PostArticle />} />

        {/* Route pour afficher la liste des articles */}
        <Route path="/articles" element={<ArticleList />} />

        {/* Route pour afficher un article spécifique */}
        <Route path="/articles/:id" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
