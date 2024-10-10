import { useState, useEffect } from 'react';

export const fetchCategories = async () => {
  const response = await fetch("/api/categories");
  console.log(response)
  if (!response.ok) {
    console.error("Error fetching categories:", "Failed to fetch categories");
    return []; // Return an empty array in case of error
  }
  const data = await response.json();
  return data;
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
