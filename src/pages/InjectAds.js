
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../BaseURL';

function NewsFeed() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [ads, setAds] = useState({});

  useEffect(() => {
    // Fetch news articles
    axios.get('https://osrc.dolearn.online/news/external/news/')
      .then(response => {
        setNewsArticles(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Fetch ads for each article
  useEffect(() => {
    newsArticles.forEach(article => {
      fetch(`${BASE_URL}/ads/ads/${article.id}`,)
      .then(response => response.json())
        .then(data => {
          setAds(prevAds => ({ ...prevAds, [article.url]: data.data }));
        })
        .catch(error => {
          console.error(error);
        });
    });

  }, [newsArticles]);

  // Inject ads into news feed
  const injectAds = (articles, ads) => {
    const injectedArticles = [];
    let adIndex = 0;

    articles.forEach((article, index) => {
      injectedArticles.push(article);

      // Inject ad every 3 articles
      if ((index + 1) % 3 === 0 && ads[article.url]) {
        injectedArticles.push({ type: 'ad', data: ads[article.url] });
      }
    });

    return injectedArticles;
  };

  const injectedArticles = injectAds(newsArticles, ads);

  return (
    <div>
      {injectedArticles.map((item, index) => {
        if (item.type === 'ad') {
          return <AdComponent key={index} ad={item.data} />;
        } else {
          return <NewsArticleComponent key={index} article={item} />;
        }
      })}
    </div>
  );
}

export default NewsFeed;
