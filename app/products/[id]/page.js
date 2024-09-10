'use client'; 
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";


export default async function ProductPage({ params }) {
    const [imageError, setImageError] = useState(false);
    const { id } = params;
    const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch product details');
    }
  
    const product = await res.json();
    const getImageSrc = () => {
        if (!imageError && product.thumbnail?.startsWith('http')) return product.thumbnail;
        if (!imageError && product.images && product.images.length > 0 && product.images[0]?.startsWith('http')) return product.images[0];
        return '/placeholder-image.jpg'; // Fallback image should be in the public directory
      };

    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <Image src={getImageSrc()} className="h-48 w-full object-contain mb-4" width={400} 
        height={300} alt={product.title}  onError={() => setImageError(true)}/>
        <p>{product.description}</p>
        <p className="text-lg text-gray-500">${product.price}</p>
        <p className="text-sm text-gray-400">Category: {product.category}</p>
        {/* Add tags, rating, stock, and reviews */}
      </div>
    );
  }
  