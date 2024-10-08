// app/api/categories/route.js
import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export async function GET() {
  try {
    const categoriesCollection = collection(db, 'categories');
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categories = categoriesSnapshot.docs.map((doc) => doc.data());

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
