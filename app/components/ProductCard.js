'use client'
import Image from 'next/image'
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useState } from 'react';

/**
 * Renders a product card with an image, title, price, category, and a link to view
 * the product details.
 * @param {Object} product - The product object, with the following properties:
 *   - id: The product ID
 *   - title: The product title
 *   - price: The product price as a string
 *   - category: The product category as a string
 *   - thumbnail: The product thumbnail image URL
 *   - images: An array of product image URLs
 */


export default function ProductCard({ product }) {
    const [imageError, setImageError] = useState(false);
    const getImageSrc = () => {
        if (!imageError && product.thumbnail?.startsWith('http')) return product.thumbnail;
        if (!imageError && product.images && product.images.length > 0 && product.images[0]?.startsWith('http')) return product.images[0];
        return '/placeholder-image.jpg'; // Fallback image should be in the public directory
      };
    
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md">
      <Image src={getImageSrc()}  width={400} // Adjust width as needed
            height={300} alt={product.title} className="h-48 w-full object-contain mb-4"  onError={() => setImageError(true)}/>
     <h2 className="font-semibold text-lg">{product.rating}</h2>
      <h2 className="font-semibold text-lg">{product.title}</h2>
    
      <p className="text-gray-500">${product.price}</p>
      <p className="text-sm text-gray-400">{product.category}</p>
      <Link href={`/products/${product.id}`} className="text-blue-500">View Details</Link>
    </div>
  );
}