import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsList = ({ searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (pageNumber = 1) => {
    try {
      let url = `https://newsapi.org/v2/everything?q=${searchQuery || "technology"}&page=${pageNumber}&pageSize=10&apiKey=YOUR_API_KEY`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.articles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prev) => [...prev, ...data.articles]);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    fetchNews(1);
  }, [searchQuery]);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage);
  };

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4 className="text-center py-4">Loading more news...</h4>}
      endMessage={<p className="text-center py-4">No more news to show</p>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <img
              src={article.urlToImage || "https://via.placeholder.com/150"}
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-lg font-bold mt-3">{article.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-2 inline-block"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default NewsList;
