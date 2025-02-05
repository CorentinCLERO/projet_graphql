import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient.js';
import ArticleList from './components/ArticleList.tsx';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Articles</h1>
        <ArticleList />
      </div>
    </ApolloProvider>
  );
}

export default App;
