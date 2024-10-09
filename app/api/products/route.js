import { NextResponse } from 'next/server';
import { db } from '@/firebase'; // Firebase config
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import Fuse from 'fuse.js';

export async function GET(request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  const search = url.searchParams.get('search') || ''; // Search query
  const category = url.searchParams.get('category') || ''; // Filter by category
  const sort = url.searchParams.get('sort') || 'asc'; // Sort by price

  try {
    const productsCollection = collection(db, 'products');
    let productsQuery = productsCollection;

    // Filter by category if provided
    if (category) {
      productsQuery = query(productsCollection, where('category', '==', category));
    }

    const productsSnapshot = await getDocs(productsQuery);
    
    // Transform the Firestore documents to JavaScript objects
    let products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Apply search using Fuse.js if search term is provided
    if (search) {
      const fuse = new Fuse(products, { keys: ['title'], threshold: 0.3 });
      products = fuse.search(search).map(({ item }) => item);
    }

    // Apply sorting by price (ascending or descending)
    products = products.sort((a, b) => {
      if (sort === 'asc') return a.price - b.price;
      return b.price - a.price;
    });

    // Handle pagination
    const paginatedProducts = products.slice(offset, offset + pageSize);

    return NextResponse.json({ products: paginatedProducts });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
