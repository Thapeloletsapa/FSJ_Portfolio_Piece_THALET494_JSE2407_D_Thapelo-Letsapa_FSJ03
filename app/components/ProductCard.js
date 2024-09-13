'use client'
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';

/* Product Card Component */
export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const getImageSrc = () => {
    if (!imageError && product.thumbnail?.startsWith('http')) return product.thumbnail;
    if (!imageError && product.images && product.images.length > 0 && product.images[0]?.startsWith('http')) return product.images[0];
    return '/placeholder-image.jpg'; // Fallback image should be in the public directory
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Product Image */}
      <Image
        src={getImageSrc()}
        width={400}
        height={300}
        alt={product.title}
        className="h-48 w-full object-contain bg-gray-100 hover:scale-105 transition-transform duration-300 ease-in-out"
        onError={() => setImageError(true)}
      />
      
      {/* Product Info */}
      <div className="p-4">
        <h2 className="font-semibold text-xl text-gray-800 truncate mb-2">{product.title}</h2>
        <p className="text-lg text-green-600 font-bold mb-2">${product.price}</p>
        <p className="text-sm text-gray-500 mb-4">{product.category}</p>

        {/* Rating and View Details */}
        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-semibold text-sm">Rating: {product.rating}</span>
          <Link href={`/products/${product.id}`} className="text-blue-600 font-semibold hover:underline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
