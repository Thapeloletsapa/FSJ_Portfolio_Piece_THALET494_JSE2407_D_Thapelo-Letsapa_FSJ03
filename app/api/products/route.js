import { db } from '../../lib/firebase'; // adjust path as necessary
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import Fuse from 'fuse.js';

// Initialize Firestore and set up your collection reference
const productsCollection = collection(db, 'products');

// Helper function to get paginated query
async function getPaginatedQuery(q, limitCount, pageCursor) {
  if (pageCursor) {
    // Query the next page starting after the last document
    q = query(q, limit(limitCount), startAfter(pageCursor));
  } else {
    q = query(q, limit(limitCount));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

// Handler for API requests
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  
  // Get query parameters
  const page = parseInt(searchParams.get('page')) || 1;
  const limitCount = parseInt(searchParams.get('limit')) || 20;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || 'price';
  const order = searchParams.get('order') || 'asc'; // 'asc' or 'desc'
  const pageCursor = searchParams.get('cursor') || null; // Store cursor for pagination

  let q = productsCollection;

  // Apply category filter
  if (category) {
    q = query(q, where('category', '==', category));
  }

  // Apply sorting
  q = query(q, orderBy(sortBy, order));

  // Pagination logic
  const querySnapshot = await getPaginatedQuery(q, limitCount, pageCursor);
  
  let products = [];
  let lastVisible = null;

  // Get the last document of the current batch for pagination
  querySnapshot.docs.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
    lastVisible = doc; // Keep track of the last document
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

  // Respond with products and the cursor for the next page
  return new Response(JSON.stringify({ products, cursor: lastVisible ? lastVisible.id : null }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
