import Head from 'next/head';
import Header from "./components/Header";
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import SortOptions from "./components/SortOptions";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1; // Ensure page is an integer
  const searchQuery = searchParams.q || '';
  const category = searchParams.category || '';
  const sortBy = searchParams.sort || '';
  const skip = (page - 1) * 20; // Calculate skip for pagination
  const limit = 20; // Limit for API request

  // Base API URL
  let apiUrl = `https://next-ecommerce-api.vercel.app/products?limit=${limit}&skip=${skip}`;

  // Handle search query
  if (searchQuery) {
    apiUrl = `https://next-ecommerce-api.vercel.app/products/search?q=${encodeURIComponent(searchQuery)}&limit=${limit}&skip=${skip}`;
  }
  
  // Handle category filter
  if (category) {
    apiUrl = `https://next-ecommerce-api.vercel.app/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  }

  // Logging the URL for debugging purposes
  console.log('Fetching products from:', apiUrl);

  let products = [];
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      const errorText = await res.text(); // Read error response for more info
      console.error('Failed to fetch products:', res.status, errorText);
      throw new Error('Failed to fetch products');
    }
    const data = await res.json();
    products = data.products || data; // Adjust based on API response structure
  } catch (error) {
    console.error('Error fetching products:', error.message);
    // Optionally, set products to an empty array or show an error message
  }

  // Client-side sorting (if API does not support it)
  if (sortBy && products.length > 0) {
    if (sortBy === 'asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'desc') {
      products.sort((a, b) => b.price - a.price);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Head>
        <title>E-Commerce App</title>
        <meta name="description" content="E-Commerce App - Browse and shop from our wide range of products" />
        <meta property="og:title" content="E-Commerce App" />
        <meta property="og:description" content="E-Commerce App - Browse and shop from our wide range of products" />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <Header />
      <SearchBar />
      <CategoryFilter categories={['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration', 'beauty']} />
      <SortByPrice />
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>No products available at the moment. Please try again later.</p>
      )}
      <Pagination currentPage={page} totalPages={Math.ceil(100 / limit)} />
    </div>
  );
}