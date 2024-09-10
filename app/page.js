/* eslint-disable react/jsx-no-undef */


import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';

export const revalidate = 60; // Revalidate every 60 seconds
// app/page.js
export default async function HomePage({ searchParams }) {
  const page = searchParams.page || 1;
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=20&skip=${(page - 1) * 20}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const products = await res.json();
  
  return (
    <div className="container mx-auto py-10">
      <ProductGrid products={products} />
      <Pagination currentPage={parseInt(page)} totalPages={20} /> {/* Assuming 10 pages */}
    </div>
  );
}
