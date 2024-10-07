import { db } from '@/lib/firebase'; // adjust path as necessary
import { doc, getDoc } from 'firebase/firestore';

export async function GET(req, { params }) {
  const { id } = params;
  const productDoc = doc(db, 'products', id);
  const productSnap = await getDoc(productDoc);
  
  if (!productSnap.exists()) {
    return new Response('Product not found', { status: 404 });
  }

  const product = { id: productSnap.id, ...productSnap.data() };

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
