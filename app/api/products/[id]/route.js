import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase'; // Firebase config

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const productDoc = doc(db, 'products', id);
    const productSnapshot = await getDoc(productDoc);

    if (!productSnapshot.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product = { id: productSnapshot.id, ...productSnapshot.data() };
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}