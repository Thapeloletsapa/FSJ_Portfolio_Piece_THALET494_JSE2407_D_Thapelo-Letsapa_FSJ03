// components/ProductGrid.js
import ProductCard from './ProductCard';

/**
 * Renders a grid of product cards.
 * @param {Object} props - Props object.
 * @param {Array} props.products - Array of product objects.
 * @returns {React.ReactElement} React element.
 */



export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
  );
}
