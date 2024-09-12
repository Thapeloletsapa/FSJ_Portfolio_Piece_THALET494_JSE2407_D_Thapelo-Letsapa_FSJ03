// components/ProductGrid.js
import ProductCard from './ProductCard';

/**
 * Renders a grid of product cards.
 * @param {Object} props - Props object.
 * @param {Array} props.products - Array of product objects.
 * @returns {React.ReactElement} React element.
 */


// Fetch products based on the current page
export async function fetchProducts(page = 1, limit = 20) {
  const skip = (page - 1) * limit; // Calculate the number of products to skip
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=${limit}&skip=${skip}`);

  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }

  return await res.json();
}

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
  );
}
