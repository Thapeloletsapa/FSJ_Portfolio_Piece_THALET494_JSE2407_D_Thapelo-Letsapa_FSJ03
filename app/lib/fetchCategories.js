import { useState, useEffect } from 'react';

export const fetchCategories = async () => {
  try {
    const response = await fetch("/api/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array in case of error
  }
};

function MyComponent() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAndDisplayCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    fetchAndDisplayCategories();
  }, []);

  return (
    <div>
<h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}> {/* Assuming each category has an id */}
            {category.name} 
          </li>
        ))}
      </ul>
    </div>
  );
}
