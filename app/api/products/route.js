// app/api/products/route.js
import { NextResponse } from 'next/server';
import { db } from '@/firebase'; // Import Firebase config
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import Fuse from 'fuse.js';

export async function GET(request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const search = url.searchParams.get('search') || '';
  const category = url.searchParams.get('category') || '';
  const sort = url.searchParams.get('sort') || 'asc';
 
  try {
    const productsCollection = collection(db, 'products');
    const productsQuery = query(
      productsCollection,
      orderBy('price', sort === 'asc' ? 'asc' : 'desc')
    );

    const productsSnapshot = await getDocs(productsQuery);
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    // Apply search
    if (search) {
      const fuse = new Fuse(products, { keys: ['title'] });
      products = fuse.search(search).map(({ item }) => item);
    }

    // Apply sort
    products = products.sort((a, b) => {
      if (sort === 'asc') return a.price - b.price;
      return b.price - a.price;
    });

    // Paginate
    const paginatedProducts = products.slice(offset, offset + pageSize);

    return NextResponse.json({ products: paginatedProducts });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
