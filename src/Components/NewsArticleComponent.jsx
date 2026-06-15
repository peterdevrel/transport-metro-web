import React from 'react';

const NewsArticleComponent = ({ article }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.published_at}</p>
      <p>{article.content}</p>
    </div>
  );
};

export default NewsArticleComponent;