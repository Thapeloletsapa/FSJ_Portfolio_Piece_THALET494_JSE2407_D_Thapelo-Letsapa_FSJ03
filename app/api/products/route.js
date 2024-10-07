import { db } from '../../lib/firebase'; // adjust path as necessary
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import Fuse from 'fuse.js';

// Initialize Firestore and set up your collection reference
const productsCollection = collection(db, 'products');

// Handler for API requests
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  
  // Get query parameters
  const page = parseInt(searchParams.get('page')) || 1;
  const limitCount = parseInt(searchParams.get('limit')) || 10;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'asc'; // 'asc' or 'desc'

  let q = query(productsCollection);
  
  // Apply category filter
  if (category) {
    q = query(q, where('category', '==', category));
  }

  // Apply sorting
  q = query(q, orderBy('price', sortBy));

  // Pagination
  const offset = (page - 1) * limitCount;
  q = query(q, limit(limitCount), startAfter(offset));

  const querySnapshot = await getDocs(q);
  
  let products = [];
  querySnapshot.docs.forEach((doc) => {
    console.log(doc)
    products.push({ id: doc.id, ...doc.data() });
  });
   
  // Searching using Fuse.js if search is provided
  if (search) {
    const fuse = new Fuse(products, {
      keys: ['title'],
      includeScore: true,
    });
    const results = fuse.search(search);
    products = results.map(result => result.item);
  }

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
