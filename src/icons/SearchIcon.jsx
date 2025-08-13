import React, { useState, useEffect, useCallback } from "react";

const SearchIcon = ({ onSearch }) => {
  const [open, setOpen] = useState(false); // Controls input visibility
  const [query, setQuery] = useState("");  // Stores the search text
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced value for API calls

  // Debounce logic: Waits 500ms after the user stops typing before setting debouncedQuery
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Trigger search whenever debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.trim() && onSearch) {
      onSearch(debouncedQuery.trim());
    }
  }, [debouncedQuery, onSearch]);

  // Toggle the search bar visibility
  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (!open) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Animated Search Input */}
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className={`transition-all duration-300 ease-in-out border border-gray-300 rounded-full px-4 py-1 text-sm outline-none ${
          open
            ? "max-sm:w-34 w-48 opacity-100"
            : "w-0 opacity-0 px-0 border-transparent"
        }`}
      />

      {/* Search Icon Button */}
      <button
        onClick={handleToggle}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default SearchIcon;
