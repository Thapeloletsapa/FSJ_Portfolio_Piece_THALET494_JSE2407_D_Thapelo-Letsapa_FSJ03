// components/CategoryFilter.js
'use client';
import { useRouter } from 'next/navigation';

const CategoryFilter = ({ categories }) => {
  const router = useRouter();

  const handleCategoryChange = (category) => {
    router.push(`/?category=${category}`);
  };

  return (
    <div>
      <select onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
