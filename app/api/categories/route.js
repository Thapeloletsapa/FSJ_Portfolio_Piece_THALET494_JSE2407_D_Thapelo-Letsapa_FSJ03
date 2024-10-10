// app/api/categories/route.js
import { NextResponse } from 'next/server';
import { collection, getDoc,doc } from 'firebase/firestore';
import { db } from '@/firebase';

export async function GET() {
  console.log('123')
  try {
    const categoriesCollection = doc(db, 'categories','allCategories');
    const categoriesSnapshot = await getDoc(categoriesCollection);
    // const categories = categoriesSnapshot.docs.map((doc) => doc.data());
    if (categoriesSnapshot.exists()){
      const categories = categoriesSnapshot.data().categories;
      return NextResponse.json({ categories });
    }
    else {
      console.log("No such Document")
      return NextResponse.json({error: "No Categories Found"}, {status : 404})
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
