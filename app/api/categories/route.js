import { db } from '../../lib/firebase.js'; 
import { collection, getDocs } from 'firebase/firestore';

export async function GET(req) {
  const categoriesCollection = collection(db, 'categories'); // Ensure you have a categories collection
  const querySnapshot = await getDocs(categoriesCollection);
  
  const categories = querySnapshot.docs.map(doc => doc.data());
  return new Response(JSON.stringify(categories), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
