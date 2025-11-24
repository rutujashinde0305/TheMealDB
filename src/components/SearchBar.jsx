import React from "react";
import { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="w-full px-6 py-4 pr-14 text-lg rounded-full border-2 border-gray-300 focus:border-red-500 focus:outline-none transition-colors shadow-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}
