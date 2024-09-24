// components/SearchBar.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert('Please enter a search term.');
      return;
    }
    router.push(`/?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for products..."
        className="border p-2"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">Search</button>
    </form>
  );
};

export default SearchBar;
