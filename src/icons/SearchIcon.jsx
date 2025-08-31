import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

const SearchIcon = ({ onSearch }) => {
  const isDarkMode = useSelector((state) => state.preferences.darkMode);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const TextClass = isDarkMode ? 'text-white' : 'text-black';

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim() && onSearch) {
      onSearch(debouncedQuery.trim());
    }
  }, [debouncedQuery, onSearch]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (!open) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  const handleInputChange = (e) => setQuery(e.target.value);

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (onSearch) onSearch(query); }}>
      <div className="flex items-center gap-2">
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search news"
          className={`transition-all duration-300 ease-in-out border border-gray-300 rounded-full px-4 py-1 text-sm outline-none ${TextClass} ${
            open ? "max-sm:w-34 w-48 opacity-100" : "w-0 opacity-0 px-0 border-transparent"
          }`}
        />
        <button
          type="button"
          onClick={handleToggle}
          className={`${TextClass} p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
          aria-label="Toggle Search"
        >
          🔍︎
        </button>
      </div>
    </form>
  );
};

export default SearchIcon;
