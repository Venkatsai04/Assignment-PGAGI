import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OMDB_API_KEY = "9778443d";
const searchTerms = [
  // Global
  "Avengers", "Batman", "Harry Potter", "Spider-Man", "Inception",
  // Indian
  "Bollywood", "RRR", "Pathaan", "3 Idiots", "Gully Boy", "Baahubali", "Dangal", "KGF"
];

const Recommendations = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const isDarkMode = useSelector((state) => state.preferences.darkMode);

  const pageBgClass = isDarkMode ? "bg-[#090030]" : "bg-amber-50";
  const textBaseClass = isDarkMode ? "text-white" : "text-black";
  const textInactiveClass = isDarkMode ? "text-[#adadad]" : "text-gray-600";
  const cardBgClass = isDarkMode ? "bg-[#1a103d]" : "bg-white";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allResults = [];
        for (let term of searchTerms) {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(term)}&type=movie`
          );
          const data = await res.json();
          if (data.Search) {
            allResults = [...allResults, ...data.Search];
          }
        }
        const uniqueResults = allResults.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.imdbID === movie.imdbID)
        );
        setMovies(uniqueResults);
      } catch (err) {
        console.error("Error fetching OMDb data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${pageBgClass}`}>
      <h1 className={`text-3xl font-bold mb-6 ${textBaseClass}`}>
        🎬 Movie Recommendations
      </h1>

      {loading ? (
        <p className={textInactiveClass}>Loading recommendations...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className={`${cardBgClass} rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col`}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title}
                className="w-full h-64 object-cover rounded"
              />
              <h2 className={`mt-3 text-lg font-semibold ${textBaseClass}`}>
                {movie.Title}
              </h2>
              <p className={`text-sm ${textInactiveClass}`}>{movie.Year}</p>
              <a
                href={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-center"
              >
                Where To Watch
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
