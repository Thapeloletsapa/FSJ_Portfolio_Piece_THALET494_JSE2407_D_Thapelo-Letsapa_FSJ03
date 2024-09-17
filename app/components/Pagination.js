"use client";
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // Assuming you have a ProductCard component
import { fetchProducts } from './fetchProducts'; // Import the fetch function

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchProducts(page); // Fetch products based on the current page
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page]); // Trigger useEffect when the page changes

  const handleNextPage = () => setPage(prevPage => prevPage + 1);
  const handlePreviousPage = () => setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error loading products: {error}</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePreviousPage}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}


/*This is a React functional component ProductsPage. It fetches products from an API based on the current page number and displays them in a grid layout. The component also includes pagination controls to navigate between pages.

Here's a breakdown of the key features:

It uses the useState hook to manage four state variables: products, page, loading, and error.
The useEffect hook is used to fetch products when the component mounts or when the page number changes.
The fetchProducts function is called with the current page number to retrieve products.
The component displays a loading message, an error message, or the products grid based on the state.
The pagination controls allow users to navigate to the previous page, next page, or view the current page number.
Overall, this component is designed to handle pagination for a list of products, fetching data from an API and updating the UI accordingly.*/