"use client"
import { useRouter } from 'next/router';

const CategoryFilter = ({ categories }) => {
  const router = useRouter();

  const handleCategoryChange = (category) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, category }, // Update URL with the category filter
    });
  };

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`p-2 ${router.query.category === category ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;