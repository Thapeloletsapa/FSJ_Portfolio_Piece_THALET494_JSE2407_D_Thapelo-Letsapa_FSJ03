// app/api/products/route.js
import { NextResponse } from 'next/server';
import { db } from '@/firebase'; // Import Firebase config
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import Fuse from 'fuse.js';

export async function GET(request) {
  const url = new URL(request.url);
  // console.log(url)
  const page = parseInt(url.searchParams.get('page')||'1');
  const pageSize = 21;
  // console.log(page,pageSize)
  const offset = (page - 1) * pageSize;
  // console.log(offset,'123445678')

console.log('123')
  const search = url.searchParams.get('search') || '';
  const category = url.searchParams.get('category') || ''; // Get the category parameter
  const sort = url.searchParams.get('sort') || 'asc';
  console.log(search,category,sort)

  try {
    const productsCollection = collection(db, 'products');
    let productsQuery = productsCollection; // Start with the base collection

    // Check if a category is provided, then filter by that category
    if (category) {
      productsQuery = query(productsCollection, where('category', '==', category));
    }

    const productsSnapshot = await getDocs(productsQuery);
    
    // Change 'const' to 'let' here to allow reassignment
    let products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Apply search using Fuse.js if a search term is provided
    if (search) {
      const fuse = new Fuse(products, { keys: ['title'] });
      products = fuse.search(search).map(({ item }) => item);
    }

    // Apply sort based on price
    products = products.sort((a, b) => {
      if (sort === 'asc') return a.price - b.price;
      return b.price - a.price;
    });

    // Paginate the filtered products
    const paginatedProducts = products.slice(offset, offset + pageSize);

    return NextResponse.json({ products: paginatedProducts });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
