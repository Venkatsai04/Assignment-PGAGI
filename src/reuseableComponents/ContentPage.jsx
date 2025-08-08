// ContentPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ContentPage = () => {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);
  const apiKey = "125b498ba5134cf0a375e40a52d32a70";

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.articles[id];
        setArticle(found);
      });
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1>{article.title}</h1>
      <img
        src={article.urlToImage}
        alt={article.title}
        style={{ width: "100%", borderRadius: "10px", margin: "20px 0" }}
      />
      <p style={{ fontSize: "18px" }}>{article.description}</p>
      <p style={{ fontSize: "16px", color: "gray" }}>
        {article.content}
      </p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          background: "#0078d4",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Read Full Article
      </a>
    </div>
  );
};

export default ContentPage;
