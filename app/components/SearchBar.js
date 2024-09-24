// app/components/SearchBar.js
'use client'; // Ensure this component is treated as a Client Component

import { useRouter } from 'next/navigation'; // Import from 'next/navigation' for client-side router
import { useState, useEffect } from 'react';

const SearchBar = () => {
  const router = useRouter(); // Use the router from 'next/navigation'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (router.query.q) {
      setSearchQuery(router.query.q);
    }
  }, [router.query]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/',
      query: { ...router.query, q: searchQuery }, // Update URL with search query
    });
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="p-2 border rounded"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
