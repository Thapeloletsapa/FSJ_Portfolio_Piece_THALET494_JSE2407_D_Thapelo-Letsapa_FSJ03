/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-async-client-component */
"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import BackToProductButton from "@/app/components/BackToProductButton";
import ProductImage from "@/app/components/ProductImage";
export default async function ProductPage({ params }) {
  const [imageError, setImageError] = useState(false);
  const { id } = params;

  let product = null;

  try {
    const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch product details');
    }

    product = await res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return (
      <div>
        <h1>Failed to load product details</h1>
        <p>Sorry, we couldn't load the product at this time. Please try again later.</p>
      </div>
    );
  }
    const getImageSrc = () => {
        if (!imageError && product.thumbnail?.startsWith('http')) return product.thumbnail;
        if (!imageError && product.images && product.images.length > 0 && product.images[0]?.startsWith('http')) return product.images[0];
        return '/placeholder-image.jpg'; // Fallback image should be in the public directory
      };

    return (
      <div className="container mx-auto py-10">
        <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
        {product.title}
    </h1>
        
        <Image src={getImageSrc()} className="h-48 w-full object-contain mb-4" width={400} 
        height={300} alt={product.title}  onError={() => setImageError(true)}/>
          <ProductImage images={product.images} />
          <p className="font-semibold text-lg">{product.rating}</p>
        <p>{product.description}</p>
        <p className="text-lg text-gray-500">${product.price}</p>
        <p className="text-sm text-gray-400">Category: {product.category}</p>
        
        <p className="font-semibold text-lg">{product.tags}</p>
        <p className="font-medium text-lg">
        {product.discountPercentage > 0 ? `Discount: ${product.discountPercentage}%` : ''}
      </p>
      <p className="font-semibold text-lg">Stock available : {product.stock}</p>
      <p className="font-semibold text-lg">Rating : {product.rating}</p>


       {/* Reviews Section */}
       <div className="bg-gray-50 p-6 rounded-lg shadow-lg mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h3>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <p className="font-semibold text-gray-700">{review.reviewerName}</p>
              <p className="text-sm text-gray-500">Date: {new Date(review.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Rating: {review.rating}/5</p>
              <p className="mt-2 text-gray-600">"{review.comment}"</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews available.</p>
        )}
      </div>

        <BackToProductButton />
        {/* Add tags, rating, stock, and reviews */}
      </div>
    );
  }
