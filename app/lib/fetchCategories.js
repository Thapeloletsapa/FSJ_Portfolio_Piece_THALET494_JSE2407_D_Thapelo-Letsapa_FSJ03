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
  const [error, setError] = useState(null); // New state for error handling
  const [loading, setLoading] = useState(true); // New state for loading status

  useEffect(() => {
    const fetchAndDisplayCategories = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        setError("Failed to load categories."); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchAndDisplayCategories();
  }, []);

  if (loading) return <div>Loading categories...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error if exists

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}> {/* Ensure category.id is unique */}
            {category.name} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;
