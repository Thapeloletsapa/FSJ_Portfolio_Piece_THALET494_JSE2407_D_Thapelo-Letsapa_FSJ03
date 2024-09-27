// components/CategoryFilter.js
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const CategoryFilter = ({ categories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    params.delete('page'); // Reset to page 1 when category changes
    router.push(`/?${params.toString()}`);
  };

  const selectedCategory = searchParams.get('category') || '';

  return (
    <div>
      <label>Filter by Category:</label>
      <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
